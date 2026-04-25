// Render functions for the Only Shop application

import { runRow } from "./effects.js";
import { mainCardProduct } from "./componentsHTML.js";
import { basketCardProduct } from "./componentsHTML.js";
import { getBasketFromLocalStorage } from "./basket.js";
import { PRODUCT_ATTRS } from "./attrs.js";

// ================================ GLOBAL FUNCTIONS ================================
// ==================================================================================

// Ставимо назву категорії в залежності від її типу та назви товару -------------------------------------------
const nameCategory = (itemProduct) => {
    switch (true){
        case itemProduct.category?.includes('chairs'): return `Крісло: «${itemProduct.name}»`;
        case itemProduct.category?.includes('slippers'): return `Тапки-Кігірумі: «${itemProduct.name}»`;
        case itemProduct.category?.includes('toys'): return `Іграшка: «${itemProduct.name}»`;
        default: return itemProduct.name;
    }
}

// Discount div -----------------------------------------------------------------------------------------------
const tagDiscount = (discount) => `<div class="price__discount">${parseFloat(discount) * 100}%</div>`

// Формуємо блок з ціною товару, враховуючи чи є стара ціна (для акційних товарів) ----------------------------
const priceProductOld = (itemProduct) =>  `
    <div class="price__old">${itemProduct.price}</div>
    <div class="price__now">
        <span>${Number(itemProduct.price) * (1 - parseFloat(itemProduct.discount))}</span>
        ${tagDiscount(itemProduct.discount)}
    </div>`;

// Блок ціни зі знижкою без відображення відсотку знижки ------------------------------------------------------
const priceProductOldSimple = (itemProduct) =>  `
    <div class="price__old">${itemProduct.price}</div>
    <div class="price__now">
        <span>${Number(itemProduct.price) * (1 - parseFloat(itemProduct.discount))}</span>
    </div>`;

// Формуємо блок з ціною товару для звичайних товарів без акції ----------------------------------------------
const priceProductActual = (itemProduct) => `
        <div class="price__now"><span>${itemProduct.price}</span>₴</div>
    `;

// Блок з відображеням певних варіацій продукту --------------------------------------------------------------
const optionsProductContainer = (itemProduct) => {
    return itemProduct.options.map(option =>`
    <div class="item-content-basket__options options options-${option.type}">
        <span>${option.type}:</span>
        <div class="options__items">
        ${optionsProduct(option)}
        </div>
    </div>
`).join('');
};

// Одна із варіацій продукту (Радо кнопка) -------------------------------------------------------------------
const optionsProduct = (options) => {
    return options.values.map(value =>`
    <label class="options__item radio-button">
        <input class="radio-button__input" value="${value}" type="radio" name="${options.type}" id="">
        <span class="radio-button__decor ${options.type === 'size' ? '_size' : ''}" ${options.type === 'size' ? `data-size="${value}"` : `style="--${options.type}-product: ${value};"`}></span>
    </label>
`).join('');
};

// ---------------------------------------------------------------

export let cost = (costBlock, price, quantity) =>{
    costBlock.textContent = price * parseInt(quantity);
} 

// ================================================================================
// ==================== RENDER FUNCTIONS ==========================================
// ================================================================================

// Render main cards on the shop page =============================
export function renderMainCards(products) {
    const mainList = document.querySelector(`[${PRODUCT_ATTRS.productParentContainer}]`);
    
    // Перевірка чи є батьківський блок
    if (!mainList) {
        console.error("Main list container not found");
        return;
    }

    // Очищаємо його
    mainList.innerHTML = "";

    // Створюємо зразок для картки продукту
    const templateMainCard = document.createElement("template");
    templateMainCard.innerHTML = mainCardProduct;
    const templateMainCardContent = templateMainCard.content;

    const fragment = document.createDocumentFragment();

    // Перебираємо весь товар і рендеримо картку для кожного
    products.forEach(product => {
        const cardClone = templateMainCardContent.cloneNode(true);
        const cardElement = cardClone.querySelector(".item-content-shop");

        if (cardElement) {
            // Додаємо атрибут який буде иістити ID
            cardElement.dataset.jsProductId = product.id;

            // Вставляємо зображення і назву для нього
            const imgElement = cardElement.querySelector("img");
            if (imgElement) {
                imgElement.src = product.image;
                imgElement.alt = product.name;
            }

            // Назва товару
            const titleElement = cardElement.querySelector(".item-content-shop__title");
            if (titleElement) {
                titleElement.textContent = nameCategory(product);
            }

            // Блок з ціною товару
            const priceBoxElement = cardElement.querySelector(".price");
            if (priceBoxElement) {
                priceBoxElement.innerHTML = product.discount ? priceProductOld(product) : priceProductActual(product);
            }

            // Зірковий рейтинг
            const ratingStarsElement = cardElement.querySelector(".rating-stars");
            if (ratingStarsElement && product.rating !== undefined) {
                ratingStarsElement.style.setProperty('--rating-percent', product.rating ? `${(product.rating / 5) * 100}%` : '0%');
            } else {
                ratingStarsElement.remove();
            }
            
            // Плашка знижки
            const discountBadgeElement = cardElement.querySelector(".item-content-shop__discount");
            if (discountBadgeElement && product.specialOffer !== undefined) {
                discountBadgeElement.style.display = product.specialOffer ? 'block' : 'none';
            } else {
                discountBadgeElement.remove();
            }
        }
        fragment.appendChild(cardClone);
    });

    mainList.appendChild(fragment);
    runRow();
};

// ================================================================================

// Render basket cards on the shop page =============================
export function renderBasketCard(products){
    const basket = document.querySelector('.content-basket');

    if(!basket){
        console.log("Basket noun")
        return
    }

    basket.innerHTML = "";

    const templateBasketCard = document.createElement("template");
    templateBasketCard.innerHTML = basketCardProduct;
    const templateBasketCardContent = templateBasketCard.content;

    const fragment = document.createDocumentFragment()

    products.forEach(product =>{
        const cardClone = templateBasketCardContent.cloneNode(true);
        const cardElement = cardClone.querySelector('.item-content-basket');

        if(cardElement){
            // Встановлюємо атрибут який містить ID
            cardElement.dataset.jsProductId = product.id;

            // Додаємо атрибут ціни
            cardElement.dataset.jsProductPrice = product.price;

            // Встановлюємо шлях до зображення 
            const imgElement = cardElement.querySelector(".item-content-basket__image");
            if (imgElement) {
                if(product.discount){
                imgElement.insertAdjacentHTML('beforeend', tagDiscount(product.discount));
                }
                const imgPhoto = imgElement.querySelector('img');
                if(imgPhoto){
                    imgPhoto.src = product.image;
                    imgPhoto.alt = product.name;
                }
            }

            // Встановлюємо назву товару
            const titleProduct = cardElement.querySelector('.item-content-basket__title');
            if(titleProduct && product.name){
                titleProduct.textContent = nameCategory(product);
            } else {
                titleProduct?.remove();
            }

            // ЗІрковий рейтинг
            const ratingStars = cardElement.querySelector('.rating-stars');
            if (ratingStars && product.rating != undefined){
                ratingStars.style.setProperty('--rating-percent', product.rating ? `${(product.rating / 5) * 100}%` : '0%');
            } else {
                ratingStars?.remove();
            }

            // Середня оцінка ористувачів та кількість відгуків
            const reviewsStatistic = cardElement.querySelector('.item-content-basket__reviews-statistic');
            if(reviewsStatistic && product.rating){
                reviewsStatistic.textContent = `(${(product.rating / 5) * 10}${product.reviewsQuantity ? ` - ${product.reviewsQuantity} Reviews`: ""})`; 
            } else {
                reviewsStatistic?.remove();
            }

            // Артикул товару
            const article = cardElement.querySelector('.item-content-basket__article');
            if(article && product.article){
                article.querySelector('span').textContent = product.article;
            } else {
                article?.remove();
            }

            // Ціна
            const price = cardElement.querySelector(".price");
            if(price && product.price){
                price.innerHTML = product.discount ? priceProductOldSimple(product) : priceProductActual(product);
            } else {
                price?.remove();
            }

            // Блок з детальною інформацією (Варіації товару)
            const contentOptions = cardElement.querySelector('.item-content-basket__details-product');
            if(contentOptions && product.options){
                contentOptions.innerHTML = optionsProductContainer(product);
            }

            // Лічильник
            const quantity = cardElement.querySelector('.quantity');
            if(quantity){
                const input = quantity.querySelector('input');
                input.value = product.quantity
            }

            // Ціна товару
            const wholeRow = cardElement.querySelector('.item-content-basket__cost');
            if(wholeRow){
                const whole = wholeRow.querySelector('b');
                cost(whole, product.price, product.quantity);
            }

            // чи є даний продукт
            const availability = cardElement.querySelector(".item-content-basket__status");
            if (availability){
                const availabilityText = availability.querySelector('span');
                availabilityText.textContent = product.availability;
                availability.dataset.statusAvailability = product.availability
            }
        }   
        fragment.appendChild(cardClone);
    });

    basket.appendChild(fragment);
}
