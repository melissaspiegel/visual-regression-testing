interface SwiperInstance extends HTMLElement {
    swiper?: {
        autoplay?: {
            stop(): void,
            delay?: boolean,
        },
        slideTo(arg1: number, arg2: number): void
    }
}

/**
 * Clean up some UI elements that commonly interfere with screenshot testing.
 */
export const cleanMwm = (): void => {
    const removeClassesAndAttributes = (selector: string, attributes: string[]) => {
        document.querySelectorAll(selector).forEach(el => {
            attributes.forEach(attr => el.removeAttribute(attr));
            el.classList.remove(...attributes);
        });
    };

    // AOS library
    removeClassesAndAttributes('.aos-init', ['aos-init']);
    removeClassesAndAttributes('.aos-animate', ['aos-animate']);
    removeClassesAndAttributes('[data-aos]', ['data-aos']);
    removeClassesAndAttributes('[data-aos-delay]', ['data-aos-delay']);
    removeClassesAndAttributes('[data-aos-duration]', ['data-aos-duration']);

    // color palette selector
    const paletteSwitcher = document.querySelector<HTMLElement>('#palette-switcher');
    if (paletteSwitcher) {
        paletteSwitcher.style.opacity = '0';
    }

    // workaround for Marketo mismatch (mock all labels with lorem ipsum)
    document.querySelectorAll('.mwm-form label').forEach(el => el.textContent = 'Lorem ipsum dolor');

    // Remove Marketo embedded style tags
    Array.from(document.styleSheets)
        .filter(stylesheet => !stylesheet.href)
        .forEach(stylesheet => {
            const isMarketo = Array.from(stylesheet.cssRules)
                .some(rule => rule.cssText.includes('.mktoForm'));
            if (isMarketo) {
                stylesheet.disabled = true;
            }
        });

    // Hide swiper progress bars and stop advancing images
    document.querySelectorAll('progress').forEach(el => {
        el.style.opacity = '0';
        const container = el.closest<SwiperInstance>('.swiper');
        if (container) {
            container.swiper?.autoplay?.stop();
            delete container.swiper?.autoplay?.delay;
            container.swiper?.slideTo(0, 0);
        }
    });
}
