import { COUNTER } from "./attrs.js";
import { PRODUCT_ATTRS } from "./attrs.js";
import { updateCostElement } from "./render.js";

// ========================================================================
// Оновлення значення лічильника ========================================== 
// ========================================================================

const updateValue = (input, newValue, direction) => {
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || +Infinity;
    const step = parseInt(input.step) || 1;

    let oldValue = input.dataset.oldValue || input.value;

    let validatedValue = parseInt(newValue);

    if (isNaN(validatedValue) || validatedValue < min){
        validatedValue = min;
    } else if (isNaN(validatedValue) || validatedValue > max){
        validatedValue = max;
    }

    if(direction){
        if(parseInt(input.value) + direction < parseInt(input.min) || parseInt(input.value) + direction > parseInt(input.max)){
            return
        }
    }

    let difference
    if(!direction){
        difference = validatedValue - oldValue;
    } 

    input.value = validatedValue;                                                 

    if(oldValue === validatedValue){
        return
    }

    input.dispatchEvent(new CustomEvent('counter:change', {
        bubbles: true,
        // value - значення input, element - на якому спрацювала подія, direction - збільшити зменшити на крок, howGrow - при ручному введені,
        detail: { value: validatedValue, element: input, direction: direction, howGrow: difference, min:min, max: max}
    }));
};

// ========================================================================
// Ініціалізація лічильника ===============================================
// ========================================================================

export const actionCounter = (btn) =>{
    const container = btn.closest(`[${COUNTER.counter}]`);
    const input = container.querySelector(`[${COUNTER.counterInput}]`);
    
    if(input){
        const step = parseFloat(input.step) || 1;
        const current = parseInt(input.value) || 0;
        const direction = btn.dataset.jsCounterBtn === 'plus' ? 1 : -1;

        updateValue(input, current + (step * direction), direction);
    }
}

// Функція яка передає значення при ручному введені значення
export const changeInput = (input) => {
    updateValue(input, input.value, null);
}

// ========================================================================
// ========================================================================
// ========================================================================

export function clickCounter (target){
    const { value, element} = target;

    // ----------------------------------------------------------
    if(!element || value === undefined){
        console.error(`[BasketError]: Відсутній element або значення undefined у ${value}`, element);
        return
    }

    // Батьківский контейнер ----------------------------------------------------------
    const productCard = element.closest(`[${PRODUCT_ATTRS.productCardBasket}]`);
    if(!productCard){
        console.error(`[BasketError]: Відсутній атрибут у батьківськї картка товару ${BASKET_ATTRS.productCard}`, element)
        return
    }

    // Блок для виведення ціни --------------------------------------------------------
    const costProduct = productCard.querySelector(`[${PRODUCT_ATTRS.productCostBlock}]`);
    if(!costProduct){
        console.error(`[BasketError]: Відсутній блок для виведення ціни ${BASKET_ATTRS.productCostBlock}`, productCard);
        return
    }

    // ID product ---------------------------------------------------------------------
    const id = productCard.getAttribute(PRODUCT_ATTRS.productId);
    if(!id){
        console.error(`[BasketError]: Відсутнє id продукту ${BASKET_ATTRS.productId}`, productCard);
        return
    }

    // Ціна продукту ------------------------------------------------------------------
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

// ========================================================================
// ========================================================================
// ========================================================================