// Basket management functions for the Only Shop application

import { allProducts } from "./main.js";
import { getFromLocalStorage } from "./localStorage.js";
import { saveToLocalStorage } from "./localStorage.js";
import { PRODUCT_ATTRS } from "./attrs.js";


// =========================================================================================
// ============================== BASKET MANAGEMENT FUNCTIONS ==============================
// =========================================================================================

// Add a product to the basket ========================================================================
export function addToBasket(product, min, max, direction, howGrow) {
    let basket = getFromLocalStorage('basket') || [];
    let existingProductIndex = basket.findIndex(item => item.id === product);

    if (existingProductIndex === -1){
        basket.push({ id: product, quantity: 1});
        existingProductIndex = basket.length - 1;
    } else if (!(basket[existingProductIndex].quantity > parseInt(max)) || !(basket[existingProductIndex].quantity < parseInt(min))){
        if(howGrow){
            basket[existingProductIndex].quantity += howGrow;
        } else {
            basket[existingProductIndex].quantity += direction;
        }
    } else {
        return
    }

    saveToLocalStorage('basket', basket);
}

// Get the full product details for items in the basket ===============================================
export function getBasketFromLocalStorage() {
    const basketItems = getFromLocalStorage('basket');
    if (!basketItems || basketItems.length === 0) return [];
    
    const fullBasket = basketItems.map(basketItem =>{
        const productData = allProducts.find(product => String(product.id) === String(basketItem.id));

        if(productData){
            return{
                ...productData,
                quantity: basketItem.quantity
            };
        }

        return null;
    })


    return fullBasket.filter(item => item != null);
}

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

export function updateBasketCounter(direction, difference){
    const basketCounter = document.querySelector('[data-count]');
    let valueBasket = basketCounter.dataset.count
    if(direction){
        valueBasket = Number(basketCounter.dataset.count) + direction;
    }

    if (difference){
        valueBasket = parseInt(valueBasket) + parseInt(difference);
    }
}

export function setBasketCounter(quantity){
    const basketCounter = document.querySelector('[data-count]');
    basketCounter.dataset.count = quantity;
}

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

export function updateCounterBasket(){
    const basketCounter = document.querySelector('[data-count]');
    const cardsProducts = getFromLocalStorage('basket')
    if(!cardsProducts){
        return
    }

    const quantity = cardsProducts.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    if(!quantity){
        basketCounter.dataset.count = 0;
        return
    }

    if (quantity <= 0){
        quantity = 0;
    } else if(quantity >= 100) {
        quantity = 99;
    }

    basketCounter.dataset.count = quantity;
}

// =======================================================================================================
