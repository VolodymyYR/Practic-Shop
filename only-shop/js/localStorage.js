export function lengthLocalStorage(key){
    // const datesLocalStorage = JSON.parse(localStorage.getItem(key));
    const datesLocalStorage = getFromLocalStorage(key);
    if (datesLocalStorage){
        const quantityProduct = datesLocalStorage.reduce((accumulator, item) => {
            return accumulator + item.quantity
        }, 0);

        return quantityProduct;
    } else {
        return 0;
    }

}

// Local Storage management functions =================================================================
export function saveToLocalStorage(key, CARD_ARRAY) {
    localStorage.setItem(key, JSON.stringify(CARD_ARRAY));
}

// Get a product from local storage by key ============================================================
export function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Remove from Local Storage ==========================================================================
export function removeLocalStorage(id){
    let localStorageBasket = getFromLocalStorage('basket');
    localStorageBasket = localStorageBasket.filter(item=> parseInt(item.id) !== parseInt(id));
    saveToLocalStorage('basket', localStorageBasket);
}