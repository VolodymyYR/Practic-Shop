import { downloadData } from "./app.js";
import { renderProducts } from "./render.js";
import { setupSlider } from "./slider.js";
import { setInitialProducts, applyFilter } from "./filter.js";

export let allProducts = [];
const filterBtn = document.querySelector(".filter-btn");

export const maxPriceValues = (products) =>{
    if(!products || products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map(p => p.price)) / 10) * 10;
}


async function initApp() {
    try {
        const data = await downloadData('/only-shop/js/products.json');
        if (data && data.length > 0) {
            allProducts = data;
            setupSlider(allProducts ? maxPriceValues(allProducts) : 0);
            setInitialProducts(allProducts);
            renderProducts(allProducts);
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

filterBtn.addEventListener("click", () => {   
    const filtered = applyFilter(allProducts);
    renderProducts(filtered);    
})


document.addEventListener("DOMContentLoaded", initApp);