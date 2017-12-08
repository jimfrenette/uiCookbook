import $ from 'jquery'
import 'slick-carousel'

export default class Lightbox {
    constructor(options) {

        this.settings = $.extend({/* defaults */}, options);

        this.init();
    }

    init() {

        let source = $(this.settings.source);

        if (source.length) {

            source.each((index, el) => {

                this.create(index, el);
            });
        }
    }

    create(index, el) {

        let selector,
            lightbox = this.settings.name + '__' + index,
            opener = $(el).find(this.settings.opener);

        $('body').append('<div data-lightbox="' + lightbox + '" class="lightbox"><div></div></div>');

        if (this.settings.type === 'slider') {

            selector = 'div[data-lightbox="' + lightbox + '"] > div';

            $(selector).slick({
                dots: false
            });

            opener.each((index, el) => {
                this.popSlider(lightbox, selector, el);
            });
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(evt) {
            if (evt.target.dataset.lightbox == lightbox) {
                $('[data-lightbox="' + lightbox + '"]').css('display', 'none');
            }
        }
    }

    popSlider(lightbox, selector, el) {

        let img = $(el).find('img'),
            src = img.prop('src'),
            slide = document.createElement('div'),
            slideImg = document.createElement('img');

        slideImg.src = src;

        slide.appendChild(slideImg);

        if (img.attr('alt')) {
            let caption = document.createElement('p'),
                captionText = document.createTextNode(img.attr('alt'));

            caption.appendChild(captionText);
            slide.appendChild(caption);
        }

        $(selector).slick('slickAdd', slide);

        img.wrap('<a href="' + src + '"></a>').on( 'click', function(evt) {

            evt.preventDefault();

            $('[data-lightbox="' + lightbox + '"]').css('display', 'block');

            let index = $(this).closest(el).index();

            $(selector).slick('slickGoTo', index);
        });
    }

}
