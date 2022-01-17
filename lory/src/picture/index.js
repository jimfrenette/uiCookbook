import { lory } from 'lory.js';

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.js_slider');
    const dots = document.querySelector('.dots');
    const dot = document.createElement('li');
    const slides = document.querySelectorAll('.js_slide');

    function handleEvents(evt) {
        if (evt.type === 'before.lory.init') {
            for (var i = 0, len = slides.length; i < len; i++) {
                var clone = dot.cloneNode();
                dots.appendChild(clone);
            }
            dots.childNodes[0].classList.add('active');
        }
        if (evt.type === 'after.lory.init') {
            for (var i = 0, len = slides.length; i < len; i++) {
                dots.childNodes[i].addEventListener('click', function (evt) {
                    lorySlider.slideTo(Array.prototype.indexOf.call(dots.childNodes, evt.target));
                });
            }
        }
        if (evt.type === 'after.lory.slide') {
            for (var i = 0, len = dots.childNodes.length; i < len; i++) {
                dots.childNodes[i].classList.remove('active');
            }
            dots.childNodes[lorySlider.returnIndex()].classList.add('active');
        }
    }

    function setSlideWidth(w = 0) {
        [].slice.call(slides).forEach((el) => {
            let styleWidth = (w == 0) ? el.querySelector('picture > img').width : w;

            el.style.width = `${styleWidth}px`;
        });
    }

    /**
     * @entries accepts one or more elements
     */
    var ro = new ResizeObserver(entries => {
        for (let entry of entries) {
            const cr = entry.contentRect;
            // console.log('Element:', entry.target);
            console.log(`Element size: ${cr.width}px x ${cr.height}px`);
            setSlideWidth(cr.width);
        }
    });

    // Only fires when img changes, e.g., size
    ro.observe(slider.querySelector('picture > img'));

    slider.addEventListener('before.lory.init', handleEvents);
    slider.addEventListener('after.lory.init', handleEvents);
    slider.addEventListener('after.lory.slide', handleEvents);

    var lorySlider = lory(slider, {
        // infinite: 1,
        enableMouseEvents: true
    });
});
