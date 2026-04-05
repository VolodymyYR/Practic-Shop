document.addEventListener("DOMContentLoaded", () => {

    let allProducts = [];
    let filteredProducts = [];
    const filterBtn = document.querySelector(".filter-btn");

    // ======================================================
    // ======================================================
    // ======================================================


    async function initApp() {
        try {
            const data = await downloadData('products.json');
            if (data && data.length > 0) {
                allProducts = data;

                const maxPriceValues = Math.ceil(Math.max(...allProducts.map(p => p.price)) / 10) * 10;

                setupSlider(maxPriceValues)
                renderProducts(allProducts);
            }
        } catch (error) {
            console.error("Error initializing app:", error);
        }
    }

    // -------------------------------------

    async function downloadData(url) { 
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error downloading data:", error);
            return null;
        }
    }

    // --------------------------------------
    
    function renderProducts(products) {
        const productList = document.querySelector(".content-shop__items");

        if (!productList) {
            console.error("Product list container not found");
            return;
        }

        const nameCategory = (itemProduct) => {
            switch (itemProduct.category){
                case 'chairs': return `Крісло: «${itemProduct.name}»`;
                case 'slippers': return `Тапки-Кігірумі: «${itemProduct.name}»`;
                case 'toys': return `Іграшка: «${itemProduct.name}»`;
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

        const discountBadge = (itemProduct) => itemProduct.category.includes('descant') ? `<div class="item-content-shop__discount run-row" data-speed="4" data-gap="10" data-pause="true" data-split="😁">Акція</div>` : '';

        productList.innerHTML = "";
        const productCards = products.map(product => `
            <div class="content-shop__item item-content-shop">
                <div class="item-content-shop__photo">
                    <img src="img/${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="item-content-shop__info">
                    <h2 class="item-content-shop__title">${nameCategory(product)}</h2>
                    ${priceBlock(product)}
                </div>
                <button class="item-content-shop__by">Купити</button>
                ${discountBadge(product)}
            </div>
        `).join("");

        productList.innerHTML = productCards;
        runRow();
        // const marqueeEls = productList.querySelectorAll('.js-marquee');
        // marqueeEls.forEach(el => {
        //     initMarquee(el);
        // });
    };

    // ======================================================
    // ======================================================
    // ======================================================

    const rangeInput = document.querySelectorAll(".range-input input");
    const priceInput = document.querySelectorAll(".price-input-container input");
    const progress = document.querySelector(".price-slider .progress");

    let priceGap = 10;

    // ------------------------------------------------------

    function setupSlider(maxPrice) {
        rangeInput[0].max = maxPrice;
        rangeInput[1].max = maxPrice;

        priceInput[0].value = 0;
        priceInput[1].value = maxPrice;

        rangeInput[0].value = 0;
        rangeInput[1].value = maxPrice;

        updateProgressBar();
    }

    // ------------------------------------------------------

    function updateProgressBar() {
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);
        let maxRange = rangeInput[1].max;

        progress.style.left = (minVal / maxRange) * 100 + "%";
        progress.style.right = 100 - (maxVal / maxRange) * 100 + "%";
    }

    updateProgressBar();

    // ------------------------------------------------------

    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minPrice = parseInt(priceInput[0].value);
            let maxPrice = parseInt(priceInput[1].value);
            
            if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minPrice;
                } else {
                    rangeInput[1].value = maxPrice;
                }
                updateProgressBar();
            }
        })
    })

    // ------------------------------------------------------

    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);

            if ((maxVal - minVal) < priceGap) { 
                if (e.target.classList.contains("range-min")) { 
                    rangeInput[0].value = maxVal - priceGap; // 
                } else {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;
                updateProgressBar();
            }
        })
    });

    // ------------------------------------------------------

    function filterPrice (filteredItems, priceMin, priceMax){
        return filteredItems.filter(p => p.price >= priceMin && p.price <= priceMax);
    }

    // ======================================================
    // ======================================================
    // ======================================================

    function filterCategory(filteredItems) {
        let categoryButtons = document.querySelectorAll(".group-filter__category input:checked");
    
        if (categoryButtons.length === 0) {
            return filteredItems; 
        } 
        const selectedCategory = Array.from(categoryButtons).map(btn => btn.value);
        
        return filteredItems.filter(p => {
            const productCats = Array.isArray(p.category) ? p.category : [p.category];
            return productCats.some((cat) => selectedCategory.includes(cat));
        });
    }

    // ======================================================
    // ======================================================
    // ======================================================

    filterBtn.addEventListener("click", () => {   
        const filtered = applyFilter();
        renderProducts(filtered);    
    })

    const applyFilter = () => {
        let result = allProducts;

        const minPrice = parseInt(priceInput[0].value);
        const maxPrice = parseInt(priceInput[1].value);

        result = filterPrice(result, minPrice, maxPrice);
        result = filterCategory(result);

        return result;
    }

    // ======================================================
    // ======================================================
    // ======================================================

        // function initMarquee(element) {
        //     if (!element || element.dataset.marqueeInitialized) return; 

        //     const speed = element.getAttribute('data-speed') || 10;
        //     const pauseOnHover = element.getAttribute('data-pause') === 'true';
        //     const repeatCount = parseInt(element.getAttribute('data-repeat'), 10) || 4;
        //     const gapRow = parseInt(element.getAttribute('data-gap')) || 10;

        //     const content = element.innerHTML;

        //     element.style.overflow = "hidden";
        //     element.style.whiteSpace = "nowrap";

        //     let spanHtml = '';
        //     for (i=0; i < repeatCount; i++){
        //         spanHtml += `<span style="display: inline-block;">${content}</span>`;
        //     }


        //     element.innerHTML = `
        //         <div class="marquee-inner" style="display: flex; column-gap: ${gapRow}px; animation: marquee-scroll ${speed}s linear infinite;">
        //             ${spanHtml}
        //         </div>
        //     `;

        //     if (pauseOnHover) {
        //         const inner = element.querySelector('.marque-inner');
        //         element.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
        //         element.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
        //     }

        //     element.dataset.marqueeInitialized = true;
        // };

    // ======================================================

    function runRow () {
        const elements = document.querySelectorAll('.run-row');
        elements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 5;
            const gapRow = parseInt(el.getAttribute('data-gap')) || 10;
            const halfGap = gapRow / 2;
            const pauseOnHover = el.getAttribute('data-pause') === 'true';
            const splitContent = el.getAttribute('data-split') || false;
            const content = el.innerHTML;
            const widthContent = el.offsetWidth;

            const tempSpan = document.createElement('span');
            tempSpan.style.whiteSpace = 'nowrap';
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.padding = `0px ${gapRow/2}px`;
            tempSpan.innerHTML = content;

            document.body.appendChild(tempSpan);
            const contentWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);

            const repeatCount = Math.ceil(widthContent / contentWidth) + 1;
            const items = [content, splitContent].filter(Boolean); // Залишаємо тільки існуючі значення

            let singleHtml;
            singleHtml = items
                .map(text => `<span style="display: inline-block; padding: 0 ${halfGap}px; white-space: nowrap">${text}</span>`)
                .join('');
            // if(splitContent){
            //     singleHtml = `<span style="display: inline-block; padding: 0 ${gapRow/2}px; white-space: nowrap">${content}</span><span style="display: inline-block; padding: 0 ${gapRow/2}px; white-space: nowrap">${splitContent}</span>`;
            // } else{
            //     singleHtml = `<span style="display: inline-block; padding: 0 ${gapRow/2}px; white-space: nowrap">${content}</span>`;
            // }

            const repeatedHtml = singleHtml.repeat(repeatCount);

            el.innerHTML = `
                <div class="run-row__box" style="display: flex; width: max-content; flex-wrap: nowrap; animation: marquee-scroll ${speed}s linear infinite;">
                    <div style="display: flex;">
                        ${repeatedHtml}
                    </div>
                    <div style="display: flex;">
                        ${repeatedHtml}
                    </div>
                </div>
            `;

            if (pauseOnHover) {
                const inner = el.querySelector('.run-row__box');
                el.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
                el.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
            }
        })
    }

    // ======================================================
    // ======================================================


    runRow();
    initApp();
}); 

