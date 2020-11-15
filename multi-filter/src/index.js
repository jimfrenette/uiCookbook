import './style.scss'

(function() {

    var el = {};

    function onFilterChange(input) {
        if (input.checked) {
            el.list.classList.add(`${input.name}--${input.value}`);
        } else {
            el.list.classList.remove(`${input.name}--${input.value}`);
        }

        Array.from(el.items).forEach(item => {
            console.log(item);
        });
    }

    function onDocumentReady() {
        el.filters = document.querySelector('.filters');
        el.list = document.querySelector('ul.cars');
        el.items = el.list.querySelectorAll('li');

        Array.from(el.filters.querySelectorAll('input')).forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                onFilterChange(event.target);
            });
        });
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());