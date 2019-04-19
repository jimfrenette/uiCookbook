import $ from 'jquery'
import 'slick-carousel'

(function () {

    var slidesToShow = 1.1,
        slideWidth = 290,
        slideSpacing = 30;

    var $el = $('.carousel');

    init();

    function init() {
        $el.on('init', (event, slick, currentSlide) => carouselInit(event, slick));

        $el.slick({
            arrows: false,
            dots: true,
            infinite: false,
            slidesToScroll: 1,
            slidesToShow: slidesToShow,
            mobileFirst: true,
            responsive: [{
                breakpoint: 980,
                settings: {
                    arrows: true,
                    slidesToShow: 3
                }
            }]
        });

        $el.css('padding-left', slideSpacing / 2 + 'px');

        var resizeTimeout;
        $(window).on('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(setSlidesToShow(), 500);
        })
    };

    function carouselInit(event, slick) {
        // https://github.com/kenwheeler/slick/issues/1802
        setTimeout(() => setSlidesToShow(), 0);
    };

    function setSlidesToShow() {
        if ($(window).width() >= 980) {
            return;
        }

        var num1, num2,
            slickListWidth = $el.find('.slick-list').width(),

        num1 = slickListWidth / slideWidth;
        num2 = Math.floor(num1) * slideSpacing;
        num1 = (slickListWidth - num2) / slideWidth;
        num1 = Math.floor(num1 * 100) / 100;

        console.log('slickListWidth', slickListWidth);
        console.log('slideWidth', slideWidth);
        console.log('slidesToShow', num1);

        $el.slick('slickSetOption', 'slidesToShow', num1);

        // refresh to apply slick-slide classes, dots etc. as needed
        $el.slick('resize');

        slidesToShow = num1;
    };

})();
