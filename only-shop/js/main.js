import { downloadData } from "./app.js";
import { renderProducts } from "./render.js";
import { setupSlider } from "./slider.js";
import { setInitialProducts, applyFilter } from "./filter.js";
import { addToBasket } from "./basket.js";
import { getCardFromLocalStorage } from "./basket.js";

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
            if (document.getElementById("filter")) {
                setupSlider(allProducts ? maxPriceValues(allProducts) : 0);
                setInitialProducts(allProducts);
                renderProducts(allProducts);
            }
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

// ==================================== EVENT LISTENER =====================================

document.addEventListener("click", (e) => {
    if (e.target === filterBtn) {
        const filtered = applyFilter(allProducts);
        renderProducts(filtered);  
    }  

    if (e.target.classList.contains("add-btn")) {
        const productCard = e.target.closest(".item-content-shop");
        const productId = productCard.dataset.id;
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            addToBasket(product);
        }
    }

    if (e.target.classList.contains("product-card__console")) {
        console.log(getCardFromLocalStorage('basket'));
    }

    if (e.target.classList.contains("btn-by")) {
        console.log("Buy button clicked");
        const productCard = e.target.closest(".item-content-shop");
        const productId = parseInt(productCard.dataset.id);
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            addToBasket(product);
        }
    }

});

// ===================================== COMPONENTS LOADER =====================================

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

// ==================================== COMPONENTS LOADER =====================================

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    if (document.getElementById("basket-page")) {
        console.log("Basket page loaded");
    }
}); 