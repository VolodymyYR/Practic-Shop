export function addToBasket(product) {
    let basket = getCardFromLocalStorage('basket') || [];
    const existingProductIndex = basket.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        basket[existingProductIndex].quantity += 1;
    } else {
        basket.push({ ...product, quantity: 1 });
    }

    saveCardToLocalStorage('basket', basket);
}

function saveCardToLocalStorage(key, CARD_ARRAY) {
    localStorage.setItem(key, JSON.stringify(CARD_ARRAY));
}

export function getCardFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}