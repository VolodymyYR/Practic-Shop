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

