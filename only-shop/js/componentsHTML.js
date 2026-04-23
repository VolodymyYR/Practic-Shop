// HTML templates for the Only Shop application

// Main card product =================================================================================
export const mainCardProduct = `
    <div class="content-shop__item item-content-shop">
        <div class="item-content-shop__photo">
            <img src="" alt="" loading="lazy">
            <div class="item-content-shop__actions">
                <button class="item-content-shop__add add-btn">🧺</button>
                <button class="item-content-shop__add add-favorite">❤️</button>    
            </div>
        </div>
        <div class="item-content-shop__info">
            <h2 class="item-content-shop__title"></h2>
            <div class="item-content-shop__price price"></div>
            <div class="rating-stars"></div>
        </div>
        <button class="item-content-shop__by add-btn">Купити</button>
        <div class="item-content-shop__discount run-row" data-speed="4" data-gap="10" data-pause="true" data-split="😁">Акція</div>
    </div>
`;

// =====================================================================================================

export const basketCardProduct = `
    <div class="content-basket__item item-content-basket">
        <div class="item-content-basket__product">
            <div class="item-content-basket__image">
                <img class="item-content-basket__photo" src="" alt="">
            </div>
            <div class="item-content-basket__information-product">
                <h2 class="item-content-basket__title"></h2>
                <div class="item-content-basket__rating">
                    <div class="item-content-basket__stars rating-stars"></div>
                    <div class="item-content-basket__reviews-statistic"></div>
                </div>
                <div class="item-content-basket__article">Артикул: <span></span></div>
                <div class="item-content-basket__price price">
                </div>
            </div>
            <div class="item-content-basket__details-product">
            </div>
            <div class="item-content-basket__details-order">
                <div class="item-content-basket__details-order-main">
                    <div class="item-content-basket__quantity">
                        <span>Кількісь</span>
                        <div class="item-content-basket__quantity quantity" data-counter="">
                            <button class="quantity__btn quantity-btn-minus" data-counter-btn="minus">-</button>
                            <div class="quantity__block-input">
                                <input type="number" class="quantity__input" data-counter-input="" value="1" min="1" max="50">
                            </div>
                            <button class="quantity__btn quantity-btn-plus" data-counter-btn="plus">+</button>
                        </div>
                    </div>
                    <div class="item-content-basket__cost">
                        <span>Загальна вартість:</span>
                        <b></b>
                    </div>
                </div>
                <div class="item-content-basket__status">
                    <span></span>
                </div>
            </div>
        </div>
        <button class="item-content__remove">🗑️</button>
    </div>
`