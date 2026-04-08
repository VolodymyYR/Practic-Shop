export function runRow () {
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