// Filter functions for the Only Shop application

import { priceInput } from "./slider.js";
import { renderMainCards } from "./render.js";
import { setupSlider } from "./slider.js";
import { maxPriceValues } from "./main.js";

// ======================================================================================
// ============================== FILTER FUNCTIONS ======================================
// ======================================================================================

// Global variable to store the initial products list for filtering
let initialProducts = [];
export const setInitialProducts = (products) => {
    initialProducts = products;
};

const restartBtn = document.querySelector(".restart-filter");

// Apply all filters to the products and return the filtered list
export const applyFilter = () => {
    const minPrice = parseInt(priceInput[0].value);
    const maxPrice = parseInt(priceInput[1].value);

    let result = initialProducts;

    result = filterPrice(result, minPrice, maxPrice);
    result = filterCategory(result);
    result = filterSpecialOffer(result);

    return result;
}

// Filter products by price range
function filterPrice (filteredItems, priceMin, priceMax){
    return filteredItems.filter(p => p.price >= priceMin && p.price <= priceMax);
}

// ======================================================
// ======================================================
// ======================================================

// Filter products by selected categories
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

// Filter product by special ofter
function filterSpecialOffer(filteredItems) {
    const specialOfferCheckbox = document.querySelector(".group-filter__item.special-offer input");
    if (!specialOfferCheckbox || !specialOfferCheckbox.checked) {
        return filteredItems;
    }
    return filteredItems.filter(p => p.specialOffer === true);
}

// ===================================================================================
// ==================== RESTART FILTER ===============================================
// ===================================================================================

if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        let activeInputs = document.querySelectorAll(".group-filter__item input:checked");
        activeInputs.forEach(btn => btn.checked = false);

        priceInput[0].value = 0;
        priceInput[1].value = maxPriceValues(initialProducts);
        // renderProducts(initialProducts);
        renderMainCards(initialProducts);
        setupSlider(maxPriceValues(initialProducts));
    })
}