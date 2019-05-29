import smoothScroll from './modules/';
import {getOffsetTop} from './modules/offset';

(function () {

    const button = document.querySelector('button');
    const scrollTarget = document.querySelector('div:last-of-type');

    button.addEventListener("click", () => {
        smoothScroll.scrollWindow(getOffsetTop(scrollTarget), 1000, 'easeOutCubic')
    }, false);

})();
