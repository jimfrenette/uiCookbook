import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import './style.scss';

(function() {

    var el = {};

    function init() {

        Array.from(el.inputs).forEach(input => {

            var output = input.closest("div").querySelector('.output');
            output.innerHTML = input.value; // Render default slider value

            // Update current slider value
            input.oninput = function() {
              output.innerHTML = this.value;
            }

        });

		var slider = document.querySelector('.range-slider-noui');

		noUiSlider.create(slider, {
			start: [20, 80],
			connect: true,
			range: {
				'min': 0,
				'max': 100
			}
		});

    }

    function onDocumentReady() {
        el.inputs = document.querySelectorAll('input.range-slider');

        init();
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());
