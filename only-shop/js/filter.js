import { priceInput } from "./slider.js";
import { renderProducts } from "./render.js";
import { setupSlider } from "./slider.js";
import { maxPriceValues } from "./main.js";

let initialProducts = [];
export const setInitialProducts = (products) => {
    initialProducts = products;
};

const restartBtn = document.querySelector(".restart-filter");

export const applyFilter = () => {
    const minPrice = parseInt(priceInput[0].value);
    const maxPrice = parseInt(priceInput[1].value);

    let result = initialProducts;

    result = filterPrice(result, minPrice, maxPrice);
    result = filterCategory(result);
    result = filterSpecialOffer(result);

    return result;
}

function filterPrice (filteredItems, priceMin, priceMax){
    return filteredItems.filter(p => p.price >= priceMin && p.price <= priceMax);
}

// ======================================================
// ======================================================
// ======================================================

function filterCategory(filteredItems) {
    let categoryButtons = document.querySelectorAll(".group-filter__item.category input:checked");
    if (categoryButtons.length === 0) {
        return filteredItems; 
    } 
    const selectedCategory = Array.from(categoryButtons).map(btn => btn.value);
    
    return filteredItems.filter(p => {
        const productCats = Array.isArray(p.category) ? p.category : [p.category];
        return productCats.some((cat) => selectedCategory.includes(cat));
    });
}

function filterSpecialOffer(filteredItems) {
    const specialOfferCheckbox = document.querySelector(".group-filter__item.special-offer input");
    if (!specialOfferCheckbox || !specialOfferCheckbox.checked) {
        return filteredItems;
    }
    return filteredItems.filter(p => p.specialOffer === true);
}

// ======================================================
// ======================================================
// ======================================================

restartBtn.addEventListener("click", () => {
    let activeInputs = document.querySelectorAll(".group-filter__item input:checked");
    activeInputs.forEach(btn => btn.checked = false);

    priceInput[0].value = 0;
    priceInput[1].value = maxPriceValues(initialProducts);
    renderProducts(initialProducts);
    setupSlider(maxPriceValues(initialProducts));
})
