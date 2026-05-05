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
import { removeLocalStorage } from "./localStorage.js";
import { updateCostElement } from "./render.js";
import { resetAllFilter } from "./filter.js";
import { PRODUCT_ATTRS } from "./attrs.js";
import { LIST_BUTTONS } from "./attrs.js";
import { COUNTER } from "./attrs.js";
import { updateBasketCounter } from "./basket.js";
import { clickCounter } from "./components.js";
import { lengthLocalStorage } from "./localStorage.js";
import { setBasketCounter } from "./basket.js";
import { updateCounterBasket } from "./basket.js"


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

// =====================================================================================
// ДОКУМЕНТ ЗАГРУЗИТЬСЯ ================================================================
// =====================================================================================

document.addEventListener("DOMContentLoaded", async () => {
    await initApp();
    if (document.getElementById("basket-page")) {
        const basketProducts = getBasketFromLocalStorage();
        renderBasketCard(basketProducts);
    }

    const quantityInBasket = lengthLocalStorage('basket');
    setBasketCounter(quantityInBasket);
}); 

// =====================================================================================
// НАТИСКАННЯ ==========================================================================
// =====================================================================================

document.addEventListener("click", (e) => {
    // --------------------------------------------------------------
    // Filter list products ----------------------------------------
    // --------------------------------------------------------------
    if (e.target.closest(`[${LIST_BUTTONS.btnFilter}]`)) {
        const filtered = applyFilter(allProducts);
        renderMainCards(filtered);
    }  

    // --------------------------------------------------------------
    // Add product to Local Storage --------------------------------
    // --------------------------------------------------------------

    if (e.target.closest(`[${LIST_BUTTONS.btnAddInLS}]`)) {
        // [ЗМІНА КІЛЬКОСТІ] - Кастомна подія ----------------------------------------------------------
        const counterBasketEvent = new CustomEvent('counter:change', {
            bubbles: true,
            // value - значення input, element - на якому спрацювала подія, direction - збільшити зменшити на крок, howGrow - при ручному введені,
            detail: { value: null, element: e.target, direction: 1, howGrow: null}
        });

        e.target.dispatchEvent(counterBasketEvent) 
    }

    // --------------------------------------------------------------
    // Full remove Local Storage and Parent Container ---------------
    // --------------------------------------------------------------
    if (e.target.closest(`[${LIST_BUTTONS.btnResetLocalStorage}]`)) {
        localStorage.clear();
        const parentsBlock = document.querySelector(`[${PRODUCT_ATTRS.productParentContainer}]`);
        parentsBlock.replaceChildren();
        updateCounterBasket();
    }

    // --------------------------------------------------------------
    // Reset all settings in Filter ---------------------------------
    // --------------------------------------------------------------
    if (e.target.closest(`[${LIST_BUTTONS.btnFilterClear}]`)){
        resetAllFilter();
    }

    // --------------------------------------------------------------
    // Change counter -----------------------------------------------
    // --------------------------------------------------------------
    if (e.target.closest(`[${COUNTER.counterBtn}]`)) {
        actionCounter(e.target)
    }

    // --------------------------------------------------------------
    // Remove card from basket and Local Storage --------------------
    // --------------------------------------------------------------
    if(e.target.closest(`[${LIST_BUTTONS.btnRemove}]`)){
        // Отримуємо всі елементи та значення
        const cardProduct = e.target.closest(`[${PRODUCT_ATTRS.productCardBasket}]`)
        const cardProductID = cardProduct.dataset.jsProductId;
        const cardInput = cardProduct.querySelector(`[${COUNTER.counterInput}]`)
        const value = cardInput.value

        // КАСТОМНА ПОДІЯ - зміна кіількості кошику
        e.target.dispatchEvent(new CustomEvent('counter:change', {
            bubbles: true,
            // value - значення input, element - на якому спрацювала подія, direction - збільшити зменшити на крок, howGrow - при ручному введені,
            detail: { value: null, element: cardProduct, direction: null, howGrow: null}
        }));

        // Видаляє картку товару з HTML
        cardProduct.remove();

        // Видаляє картку товару з локальної пам'яті
        removeLocalStorage(cardProductID)

        // Оновлюємо значення кошику
        updateCounterBasket();
    }
});

// =====================================================================================
// Change ==============================================================================
// =====================================================================================

document.addEventListener('change', (e) => {

    // Change input in counter
    if (e.target.closest(`[${COUNTER.counterInput}]`)){
        changeInput(e.target)
        // Скидажмо фокус з елемента
        e.target.blur();
    }
})

// =====================================================================================
// FOCUS ==============================================================================
// =====================================================================================

document.addEventListener('focusin', e => {
    const target = e.target;

    // Встановлюємо значення атрибуту. Стару кількість товару
    if(target.closest(`[${COUNTER.counterInput}]`)){
        const input = target.closest(`[${COUNTER.counterInput}]`);
        const oldValue = input.value;
        input.dataset.oldValue =  oldValue;
    }
})

// =====================================================================================
// Зміна кількості товару ==============================================================
// =====================================================================================

document.addEventListener('counter:change', (e) => {
    let productCard
    // Призначаємо картку товару
    if(e.detail.element.closest(`[${PRODUCT_ATTRS.productCardMain}]`)){
        productCard = e.detail.element.closest(`[${PRODUCT_ATTRS.productCardMain}]`); 
    } else {
        productCard = e.detail.element.closest(`[${PRODUCT_ATTRS.productCardBasket}]`);
    }


    // Перевіряємо чи є картка товару --------------------------------------------------------------
    if (!productCard){
        console.error(`[CARD_PRODUCT] не має батьківського контейнера`)
        return
    }

    // Перевіряємо чи є такий товар і створюємо масив ----------------------------------------------
    const productId = Number(productCard.dataset.jsProductId);
    if(!productId){
        console.error(`[CARD_PRODUCT] не має ID товару`)
        return
    }

    // Перевіряємо чи збігається ID
    let product
    if(productCard.closest('main')){
        product = allProducts.find(p => p.id === productId);
    } else {
        const products = getFromLocalStorage('basket')
        product = products.find(p => p.id === productId);
    }

    // Чи є внас призначене ID
    if (!product){
        console.error(`[CARD_PRODUCT] Не має співпадіння ${productId} і id з каталогу` )
        return
    }

    //Додаємо товар в локальну пам'ять -------------------------------------------------------------
    if (product) {
        addToBasket(product.id, e.detail.min, e.detail.max, e.detail.direction, e.detail.howGrow);
    }

    // Запускаємо значення збільшити/зменшити на крок
    if (e.detail.value !== undefined && e.detail.value !== null && e.detail.value !== ''){
        clickCounter(e.detail);
    }

    // Оновлюємо лічильник
    updateCounterBasket();
})

