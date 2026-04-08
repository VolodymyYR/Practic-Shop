import { runRow } from "./effects.js";

export function renderProducts(products) {
    const productList = document.querySelector(".content-shop__items");

    if (!productList) {
        console.error("Product list container not found");
        return;
    }

    const nameCategory = (itemProduct) => {
        switch (true){
            case itemProduct.category.includes('chairs'): return `Крісло: «${itemProduct.name}»`;
            case itemProduct.category.includes('slippers'): return `Тапки-Кігірумі: «${itemProduct.name}»`;
            case itemProduct.category.includes('toys'): return `Іграшка: «${itemProduct.name}»`;
            default: return itemProduct.name;
        }
    }

    const priceProductOld = (itemProduct) =>  `
        <div class="item-content-shop__price-box">
            <div class="item-content-shop__price old"><span>${itemProduct.priceOld}</span>₴</div>
            <div class="item-content-shop__price new"><span>${itemProduct.price}</span>₴</div>
        </div>`;
    
    const priceProductActual = (itemProduct) => `
        <div class="item-content-shop__price-box">
            <div class="item-content-shop__price"><span>${itemProduct.price}</span>₴</div>
        </div>`;
            
    const priceBlock = (itemProduct) => itemProduct.priceOld ? priceProductOld(itemProduct) : priceProductActual(itemProduct);

    const discountBadge = (itemProduct) => itemProduct.specialOffer === true ? `<div class="item-content-shop__discount run-row" data-speed="4" data-gap="10" data-pause="true" data-split="😁">Акція</div>` : '';

    let star;
    const starsBlock = (itemProduct) => {
        if (!itemProduct.rating) return '';
        return star = `
            <div class="rating-stars" style="--rating-percent: ${itemProduct.rating ? (itemProduct.rating / 5) * 100 : 0}%;"></div>
        `;   
    }

    productList.innerHTML = "";
    const productCards = products.map(product => `
        <div class="content-shop__item item-content-shop">
            <div class="item-content-shop__photo">
                <img src="img/${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="item-content-shop__info">
                <h2 class="item-content-shop__title">${nameCategory(product)}</h2>
                ${priceBlock(product)}
                ${starsBlock(product)}
            </div>
            <button class="item-content-shop__by">Купити</button>
            ${discountBadge(product)}
        </div>
    `).join("");

    productList.innerHTML = productCards;
    runRow();
};
