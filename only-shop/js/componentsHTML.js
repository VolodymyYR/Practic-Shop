// HTML templates for the Only Shop application

// ===================================================================================================
// Main card product =================================================================================
// ===================================================================================================

export const mainCardProduct = `
    <div class="content-shop__item item-content-shop" data-js-main-product>
        <div class="item-content-shop__photo">
            <img src="" alt="" loading="lazy">
            <div class="item-content-shop__actions">
                <button class="item-content-shop__add add-btn">🧺</button>
                <button class="item-content-shop__add add-favorite">❤️</button>    
            </div>
        </div>
        <div class="item-content-shop__info">
            <h2 class="item-content-shop__title" data-js-product-title></h2>
            <div class="item-content-shop__price price" data-js-product-price-block></div>
            <div class="rating-stars" data-js-rating-stars></div>
        </div>
        <button class="item-content-shop__by add-btn" data-js-add-btn>Купити</button>
        <div class="item-content-shop__discount run-row" data-js-product-discount data-js-run-row data-js-run-row-speed="4" data-js-run-row-gap="10" data-js-run-row-pause="true" data-js-run-row-split="😁">Акція</div>
    </div>
`;

// =====================================================================================================
// Card product in basket ==============================================================================
// =====================================================================================================

export const basketCardProduct = `
    <div class="content-basket__item item-content-basket" data-js-basket-product>
        <div class="item-content-basket__product">
            <div class="item-content-basket__image" data-js-product-img>
                <img class="item-content-basket__photo" src="" alt="">
            </div>
            <div class="item-content-basket__information-product">
                <h2 class="item-content-basket__title" data-js-product-title></h2>
                <div class="item-content-basket__rating">
                    <div class="item-content-basket__stars rating-stars" data-js-rating-stars></div>
                    <div class="item-content-basket__reviews-statistic"></div>
                </div>
                <div class="item-content-basket__article" data-js-article>Артикул: <span></span></div>
                <div class="item-content-basket__price price" data-js-product-price-block>
                </div>
            </div>
            <div class="item-content-basket__details-product" data-js-product-details>
            </div>
            <div class="item-content-basket__details-order">
                <div class="item-content-basket__details-order-main">

                    <div class="item-content-basket__quantity">
                        <span>Кількісь</span>
                        <div class="item-content-basket__quantity quantity" data-js-counter="">
                            <button class="quantity__btn quantity-btn-minus" data-js-counter-btn="minus">-</button>
                            <div class="quantity__block-input">
                                <input type="number" class="quantity__input" data-js-counter-input value="1" min="1" max="50">
                            </div>
                            <button class="quantity__btn quantity-btn-plus" data-js-counter-btn="plus">+</button>
                        </div>
                    </div>

                    <div class="item-content-basket__cost">
                        <span>Загальна вартість:</span>
                        <b data-js-product-cost></b>
                    </div>

                </div>
                <div class="item-content-basket__status" data-js-product-status>
                    <span></span>
                </div>
            </div>
        </div>
        <button class="item-content__remove" data-js-btn-remove>🗑️</button>
    </div>
`