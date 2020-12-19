import './style.scss'

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
