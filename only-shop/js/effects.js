import { RUN_ROW } from "./attrs.js";

// Effects functions for the Only Shop application

// Run-row effect for elements with the class "run-row" ============================================================
// data attributes:
// data-speed - speed of the animation (default: 5s)
// data-gap - gap between repeated content in pixels (default: 10px)
// data-pause - whether to pause animation on hover (default: false)
// data-split - optional content to alternate with the main content (default: none)

export function runRow () {
    const elements = document.querySelectorAll(`[${RUN_ROW.runRow}]`);
    elements.forEach(el => {
        const speed = el.getAttribute(`${RUN_ROW.runRowSpeed}`) || 5;
        const gapRow = parseInt(el.getAttribute(`${RUN_ROW.runRowGap}`)) || 10;
        const halfGap = gapRow / 2;
        const pauseOnHover = el.getAttribute(`${RUN_ROW.runRowPause}`) === 'true';
        const splitContent = el.getAttribute(`${RUN_ROW.runRowSplit}`) || false;
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
            .join('')
        ;

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