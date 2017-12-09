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

        let lightbox = this.settings.name + '__' + index,
            opener = $(el).find(this.settings.opener);

        $('body').append('<div data-lightbox="' + lightbox + '" class="lightbox"><div></div></div>');

        if (this.settings.type === 'slider') {

            $('div[data-lightbox="' + lightbox + '"] > div')
                .append('<div class="lightbox-slider"></div>');

            var slider = $('div[data-lightbox="' + lightbox + '"] .lightbox-slider');

            slider.slick({
                dots: false
            });

            opener.each((index, el) => {
                this.popSlider(lightbox, slider, el);
            });
        }

        // close button
        $('div[data-lightbox="' + lightbox + '"] > div')
            .prepend('<a class="lightbox-close" href="javascript:void(0)">+</a>')
            .on( 'click', function() {
                $('[data-lightbox="' + lightbox + '"]').removeClass('is-open');
            });

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(evt) {
            if (evt.target.dataset.lightbox == lightbox) {
                $('[data-lightbox="' + lightbox + '"]').removeClass('is-open');
            }
        }
    }

    popSlider(lightbox, slider, el) {

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

        slider.slick('slickAdd', slide);

        img.wrap('<a href="' + src + '"></a>').on( 'click', function(evt) {

            evt.preventDefault();

            $('[data-lightbox="' + lightbox + '"]').addClass('is-open');

            let index = $(this).closest(el).index();

            slider.slick('slickGoTo', index);
        });
    }

}
