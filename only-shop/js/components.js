import { COUNTER } from "./attrs.js";

// Оновлення значення лічильника 
const updateValue = (input, newValue) => {
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || +Infinity;
    const step = parseInt(input.step) || 1;

    let validatedValue = parseInt(newValue);

    if (isNaN(validatedValue) || validatedValue < min){
        validatedValue = min;
    } else if (isNaN(validatedValue) || validatedValue > max){
        validatedValue = max;
    }

    input.value = validatedValue;
    
    input.dispatchEvent(new CustomEvent('counter:change', {
        bubbles: true,
        detail: { value: validatedValue, input: input}
    }));
};

// Ініціалізація лічильника ==========================================================
export const actionCounter = (btn) =>{
    const container = btn.closest(`[${COUNTER.counter}]`);
    const input = container.querySelector(`[${COUNTER.counterInput}]`);
    
    if(input){
        const step = parseFloat(input.step) || 1;
        const current = parseInt(input.value) || 0;
        const direction = btn.dataset.jsCounterBtn === 'plus' ? 1 : -1;

        updateValue(input, current + (step * direction));
    }
}

// Функція яка передає значення при ручному введені значення
export const changeInput = (input) => {
    updateValue(input, input.value);
}

// ==================================================================================

export function clickCounter (target){
    const { value, input} = target;
    if(!input || value === undefined){
        console.error(`[BasketError]: Відсутній input або значення undefined у ${value}`, input);
        return
    }

    const productCard = input.closest(`[${PRODUCT_ATTRS.productCardBasket}]`);
    if(!productCard){
        console.error(`[BasketError]: Відсутній атрибут у батьківськї картка товару ${BASKET_ATTRS.productCard}`, input)
        return
    }
    const costProduct = productCard.querySelector(`[${PRODUCT_ATTRS.productCostBlock}]`);
    if(!costProduct){
        console.error(`[BasketError]: Відсутній блок для виведення ціни ${BASKET_ATTRS.productCostBlock}`, productCard);
        return
    }
    const id = productCard.getAttribute(PRODUCT_ATTRS.productId);
    if(!id){
        console.error(`[BasketError]: Відсутнє id продукту ${BASKET_ATTRS.productId}`, productCard);
        return
    }
    const basePriceProduct = productCard.getAttribute(PRODUCT_ATTRS.productPrice);
    if(!basePriceProduct){
        const id = productCard.getAttribute(PRODUCT_ATTRS.productId);
        console.error(`[BasketError]: Відсутня ціна продукту ${BASKET_ATTRS.productPrice} у продукта ${id}`, productCard);
        return
    }

    const priceProduct = Number(basePriceProduct);
    const quantity = Number(value)


    updateCostElement(costProduct, priceProduct, quantity);
}