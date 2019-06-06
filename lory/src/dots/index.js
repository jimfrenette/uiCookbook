import { lory } from 'lory.js';

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.js_slider');
    const dots = document.querySelector('.dots');
    const dot = document.createElement('li');
    let slideCount = document.querySelectorAll('.js_slide').length;

    function handleEvents(evt) {
        if (evt.type === 'before.lory.init') {
            for (var i = 0, len = slideCount; i < len; i++) {
                var clone = dot.cloneNode();
                dots.appendChild(clone);
            }
            dots.childNodes[0].classList.add('active');
        }
        if (evt.type === 'after.lory.init') {
            for (var i = 0, len = slideCount; i < len; i++) {
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

    slider.addEventListener('before.lory.init', handleEvents);
    slider.addEventListener('after.lory.init', handleEvents);
    slider.addEventListener('after.lory.slide', handleEvents);

    var lorySlider = lory(slider, {
        // infinite: 1,
        enableMouseEvents: true
    });
});
