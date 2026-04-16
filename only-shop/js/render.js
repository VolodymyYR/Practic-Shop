// Render functions for the Only Shop application

import { runRow } from "./effects.js";
import { mainCardProduct } from "./componentsHTML.js";

// ================================ GLOBAL FUNCTIONS ================================
// ==================================================================================

// Ставимо назву категорії в залежності від її типу та назви товару ===========
const nameCategory = (itemProduct) => {
    switch (true){
        case itemProduct.category.includes('chairs'): return `Крісло: «${itemProduct.name}»`;
        case itemProduct.category.includes('slippers'): return `Тапки-Кігірумі: «${itemProduct.name}»`;
        case itemProduct.category.includes('toys'): return `Іграшка: «${itemProduct.name}»`;
        default: return itemProduct.name;
    }
}

// Формуємо блок з ціною товару, враховуючи чи є стара ціна (для акційних товарів)
const priceProductOld = (itemProduct) =>  `
    <div class="item-content-shop__price-box">
        <div class="item-content-shop__price old"><span>${itemProduct.priceOld}</span>₴</div>
        <div class="item-content-shop__price new"><span>${itemProduct.price}</span>₴</div>
    </div>`;

// Формуємо блок з ціною товару для звичайних товарів без акції
const priceProductActual = (itemProduct) => `
    <div class="item-content-shop__price-box">
        <div class="item-content-shop__price"><span>${itemProduct.price}</span>₴</div>
    </div>`;
        
// ================================================================================
// ==================== RENDER FUNCTIONS ==========================================
// ================================================================================

// Render main cards on the shop page =============================

export function renderMainCards(products) {
    const mainList = document.querySelector(".content-shop__items");
    
    if (!mainList) {
        console.error("Main list container not found");
        return;
    }

    mainList.innerHTML = "";

    const templateMainCard = document.createElement("template");
    templateMainCard.innerHTML = mainCardProduct;
    const templateMainCardContent = templateMainCard.content;

    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const cardClone = templateMainCardContent.cloneNode(true);
        const cardElement = cardClone.querySelector(".item-content-shop");

        if (cardElement) {
            cardElement.dataset.id = product.id;

            const imgElement = cardElement.querySelector("img");
            if (imgElement) {
                imgElement.src = product.image;
                imgElement.alt = product.name;
            }

            const titleElement = cardElement.querySelector(".item-content-shop__title");
            if (titleElement) {
                titleElement.textContent = nameCategory(product);
            }

            const priceBoxElement = cardElement.querySelector(".item-content-shop__price-box");
            if (priceBoxElement) {
                priceBoxElement.innerHTML = product.priceOld ? priceProductOld(product) : priceProductActual(product);
            }
            const ratingStarsElement = cardElement.querySelector(".rating-stars");
            if (ratingStarsElement && product.rating !== undefined) {
                ratingStarsElement.style.setProperty('--rating-percent', product.rating ? `${(product.rating / 5) * 100}%` : '0%');
            }
            
            const discountBadgeElement = cardElement.querySelector(".item-content-shop__discount");
            if (discountBadgeElement && product.specialOffer !== undefined) {
                discountBadgeElement.style.display = product.specialOffer ? 'block' : 'none';
            }
        }
        fragment.appendChild(cardClone);
    });

    mainList.appendChild(fragment);
    runRow();
};
