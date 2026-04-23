// Basket management functions for the Only Shop application

import { allProducts } from "./main.js";

// =========================================================================================
// ============================== BASKET MANAGEMENT FUNCTIONS ==============================
// =========================================================================================

// Add a product to the basket ========================================================================
export function addToBasket(product) {
    let basket = getCardFromLocalStorage('basket') || [];
    const existingProductIndex = basket.findIndex(item => item.id === product);

    if (existingProductIndex !== -1) {
        basket[existingProductIndex].quantity += 1;
    } else {
        basket.push({ id: product, quantity: 1 });
    }

    saveCardToLocalStorage('basket', basket);
}

// Local Storage management functions =================================================================
function saveCardToLocalStorage(key, CARD_ARRAY) {
    localStorage.setItem(key, JSON.stringify(CARD_ARRAY));
}

// Get a product from local storage by key ============================================================
export function getCardFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Get the full product details for items in the basket ===============================================
export function getBasketFromLocalStorage() {
    const basketItems = getCardFromLocalStorage('basket');
    if (!basketItems || basketItems.length === 0) return [];
    // const allBasket = allProducts.filter(product => {
    //     return basketItems.some(item => String(item.id) === String(product.id));
    // });

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