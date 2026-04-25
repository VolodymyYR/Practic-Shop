// Main JavaScript file for the Only Shop application

// Import necessary modules and functions
import { downloadData } from "./app.js";
import { renderMainCards } from "./render.js";
import { renderBasketCard } from "./render.js";
import { setupSlider } from "./slider.js";
import { setInitialProducts, applyFilter } from "./filter.js";
import { addToBasket } from "./basket.js";
import { getBasketFromLocalStorage } from "./basket.js";
import { actionCounter } from "./components.js";
import { changeInput } from "./components.js";
import { removeLocalStorage } from "./basket.js";
import { cost } from "./render.js";
import { resetAllFilter } from "./filter.js";
import { PRODUCT_ATTRS } from "./attrs.js";
import { LIST_BUTTONS } from "./attrs.js";
import { COUNTER } from "./attrs.js";


export let allProducts = [];

// =======================================================================================================================
// =======================================================================================================================
// =======================================================================================================================

export const maxPriceValues = (products) =>{
    if(!products || products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map(p => p.price)) / 10) * 10;
}

// ========================================================================================================================
// ==================================== ЗАПУСК ============================================================================
// ========================================================================================================================

async function initApp() {
    try {
        const data = await downloadData('/only-shop/js/products.json');
        if (data && data.length > 0) {
            allProducts = data;
            if (document.getElementById("filter")) {
                setupSlider(allProducts ? maxPriceValues(allProducts) : 0);
                setInitialProducts(allProducts);
                renderMainCards(allProducts);
            }
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

// ========================================================================================================================
// ================================== COMPONENTS LOADER (Повторюючі HTML-елементи) ========================================
// ========================================================================================================================


function loadComponent(id, path) {
    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`Error loading component ${id}:`, error));
}

loadComponent("main-header", "/only-shop/html/header.html");
loadComponent("main-footer", "/only-shop/html/footer.html");

// ========================================================================================================================
// ==================================== EVENT LISTENERS ===================================================================
// ========================================================================================================================

// ДОКУМЕНТ ЗАГРУЗИТЬСЯ ================================================================

document.addEventListener("DOMContentLoaded", async () => {
    await initApp();
    if (document.getElementById("basket-page")) {
        const basketProducts = getBasketFromLocalStorage();
        console.log("Basket Products:", basketProducts);
        renderBasketCard(basketProducts);
    }
}); 

// НАТИСКАННЯ ================================================================

document.addEventListener("click", (e) => {
    // Filter list products ----------------------------------------
    if (e.target.closest(`[${LIST_BUTTONS.btnFilter}]`)) {
        const filtered = applyFilter(allProducts);
        renderMainCards(filtered);
    }  

    // Add product to Local Storage --------------------------------
    if (e.target.closest(`[${LIST_BUTTONS.btnAddInLS}]`)) {
        const productCard = e.target.closest(`[${PRODUCT_ATTRS.productCard}]`);
        if (!productCard){
            console.error(`[CARD_PRODUCT] не має батьківського контейнера`)
            return
        }
        const productId = Number(productCard.dataset.jsProductId);
        const product = allProducts.find(p => p.id === productId);
        if (!productId){
            console.error(`[CARD_PRODUCT] Не має співпадіння ${productId} і id з каталогу` )
            return
        }
        if (productId) {
            console.log(productId)
            addToBasket(productId);
        }
    }

    // Full remove Local Storage and Parent Container ---------------
    if (e.target.classList.contains(`[${LIST_BUTTONS.btnResetLocalStorage}]`)) {
        localStorage.clear();
        const parentsBlock = document.querySelector(`[${PRODUCT_ATTRS.productParentContainer}]`);
        parentsBlock.replaceChildren();
    }

    // Reset all settings in Filter --------------------------------- 
    if (e.target.closest(`[${LIST_BUTTONS.btnFilterClear}]`)){
        resetAllFilter();
    }
    // Change counter -----------------------------------------------
    if (e.target.closest(`[${LIST_BUTTONS.btnCounter}]`)) {
        actionCounter(e.target)
    }

    // Remove card from basket and Local Storage --------------------
    if(e.target.closest(`[${LIST_BUTTONS.btnRemove}]`)){
        const cardProduct = e.target.closest(`[${PRODUCT_ATTRS.productCard}]`)
        const cardProductID = cardProduct.dataset.jsProductId;
        removeLocalStorage(cardProductID)
        cardProduct.remove();
    }
});

// Change -----------------------------------------------------------
document.addEventListener('change', (e) => {

    // Change input in counter
    if (e.target.hasAttribute(`[${COUNTER.inputCounter}]`)){
        changeInput(e.target)
    }
})

// ------------------------------------------------------------------

document.addEventListener('counter:change', (e) => {
    const { value, input} = e.detail;
    if(!input || value === undefined){
        console.error(`[BasketError]: Відсутній input або значення undefined у ${value}`, input);
        return
    }

    const productCard = input.closest(`[${PRODUCT_ATTRS.productCard}]`);
    if(!productCard){
        console.error(`[BasketError]: Відсутній атрибут у батьківськї картка товару ${BASKET_ATTRS.productCard}`, input)
        return
    }
    const costProduct = productCard.querySelector(`[${PRODUCT_ATTRS.productCostBlock}]`);
    if(!costProduct){
        console.error(`[BasketError]: Відсутній блок для виведення ціни ${BASKET_ATTRS.productCostBlock}`, productCard);
        return
    }
    const id = productCard.getAttribute(PRODUCT_ATTRS.productId);
    if(!id){
        console.error(`[BasketError]: Відсутнє id продукту ${BASKET_ATTRS.productId}`, productCard);
        return
    }
    const basePriceProduct = productCard.getAttribute(PRODUCT_ATTRS.productPrice);
    if(!basePriceProduct){
        const id = productCard.getAttribute(PRODUCT_ATTRS.productId);
        console.error(`[BasketError]: Відсутня ціна продукту ${BASKET_ATTRS.productPrice} у продукта ${id}`, productCard);
        return
    }

    const priceProduct = Number(basePriceProduct);
    const quantity = Number(value)


    cost(costProduct, priceProduct, quantity);
})