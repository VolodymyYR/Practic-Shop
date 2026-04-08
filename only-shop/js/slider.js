const rangeInput = document.querySelectorAll(".range-input input");
export const priceInput = document.querySelectorAll(".price-input-container input");
const progress = document.querySelector(".price-slider .progress");

let priceGap = 10;


export function setupSlider(maxPrice) {
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