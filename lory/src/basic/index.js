import { lory } from 'lory.js';

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.js_slider');

    lory(slider, {
        // infinite: 1,
        enableMouseEvents: true,
    });
});
