// slider.js - JavaScript code for the price range slider component in the Only Shop application

const rangeInput = document.querySelectorAll(".range-input input");
export const priceInput = document.querySelectorAll(".price-input-container input");
const progress = document.querySelector(".price-slider .progress");

// =====================================================
// ======== Global variable ============================
// =====================================================

let priceGap = 10;

// =====================================================
// ======== Slider functions ============================
// =====================================================

// function to initialize the slider with the maximum price value from the products list =================
export function setupSlider(maxPrice) {
    rangeInput[0].max = maxPrice;
    rangeInput[1].max = maxPrice;

    priceInput[0].value = 0;
    priceInput[1].value = maxPrice;

    rangeInput[0].value = 0;
    rangeInput[1].value = maxPrice;

    updateProgressBar();
}

// function to update the position of the progress bar between the two range inputs ============================

function updateProgressBar() {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    let maxRange = rangeInput[1].max;

    progress.style.left = (minVal / maxRange) * 100 + "%";
    progress.style.right = 100 - (maxVal / maxRange) * 100 + "%";
}

// Event listeners for the price input fields and range inputs to synchronize their values and update the progress bar ============================

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

// Event listeners for the range inputs to ensure the minimum gap is maintained and to update the price input fields and progress bar ============================

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