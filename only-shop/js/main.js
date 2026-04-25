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

export let allProducts = [];
const filterBtn = document.querySelector(".filter-btn");

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
    if (e.target === filterBtn) {
        const filtered = applyFilter(allProducts);
        renderMainCards(filtered);
    }  

    // Add product to Local Storage --------------------------------
    if (e.target.classList.contains("add-btn")) {
        const productCard = e.target.closest(".item-content-shop");
        const productId = Number(productCard.dataset.id);
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            const idCard = product.id;
            addToBasket(idCard);
        }
    }

    // Full remove Local Storage and Parent Container ---------------
    if (e.target.classList.contains("clear-basket")) {
        localStorage.clear();
        const parentsBlock = document.querySelector(".card-items");
        parentsBlock.replaceChildren();
    }

    // Change counter -----------------------------------------------
    if (e.target.closest("[data-counter-btn]")) {
        actionCounter(e.target)
    }

    // Remove card from basket and Local Storage --------------------
    if(e.target.closest('.item-content__remove')){
        const cardProduct = e.target.closest('.item-content-basket')
        const cardProductID = cardProduct.dataset.id;
        removeLocalStorage(cardProductID)
        cardProduct.remove();
    }
});

// Change -----------------------------------------------------------
document.addEventListener('change', (e) => {

    // Change input in counter
    if (e.target.hasAttribute('data-counter-input')){
        changeInput(e.target)
    }
})

// ------------------------------------------------------------------

const BASKET_ATTRS = {
    itemCard: 'data-js-basket-item',
    productId: 'data-js-product-id',
    costBlock: 'data-js-product-cost',
    productPrice: 'data-js-product-price'
}

document.addEventListener('counter:change', (e) => {
    const { value, input} = e.detail;
    if(!input || value === undefined){
        console.error(`[BasketError]: Відсутній input або значення undefined у ${value}`, input);
        return
    }

    const productCard = input.closest(`[${BASKET_ATTRS.itemCard}]`);
    if(!productCard){
        console.error(`[BasketError]: Відсутній атрибут у батьківськї картка товару ${BASKET_ATTRS.itemCard}`, input)
        return
    }
    const costProduct = productCard.querySelector(`[${BASKET_ATTRS.costBlock}]`);
    if(!costProduct){
        console.error(`[BasketError]: Відсутній блок для виведення ціни ${BASKET_ATTRS.costBlock}`, productCard);
        return
    }
    const id = productCard.getAttribute(BASKET_ATTRS.productId);
    if(!id){
        console.error(`[BasketError]: Відсутнє id продукту ${BASKET_ATTRS.productId}`, productCard);
        return
    }
    const basePriceProduct = productCard.getAttribute(BASKET_ATTRS.productPrice);
    if(!basePriceProduct){
        const id = productCard.getAttribute(BASKET_ATTRS.productId);
        console.error(`[BasketError]: Відсутня ціна продукту ${BASKET_ATTRS.productPrice} у продукта ${id}`, productCard);
        return
    }

    const priceProduct = Number(basePriceProduct);
    const quantity = Number(value)


    cost(costProduct, priceProduct, quantity);
})