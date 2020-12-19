import './style.scss'

(function() {

    var el = {};

    function onDocumentReady() {
        el.input = document.querySelector('input.range-slider');
        el.wrapper = el.input.closest("div");
        el.output = el.wrapper.querySelector('.output');

        el.output.innerHTML = el.input.value; // Render default slider value

        // Update current slider value
        el.input.oninput = function() {
          el.output.innerHTML = this.value;
        }
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());
