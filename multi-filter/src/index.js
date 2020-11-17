import './style.scss'

(function() {

    var el = {};

    function matches(key, value) {
        var count = 0;
        Array.from(el.items).forEach(item => {
            switch(key) {
                case 'make':
                    if (item.dataset.make === value) {
                        count ++;
                    }
                    break;
                case 'model':
                    if (item.dataset.model === value) {
                        count ++;
                    }
                    break;
                case 'year':
                    if (item.dataset.year === value) {
                        count ++;
                    }
                    break;
            }
        });
        return count;
    }

    function match(item) {
        var match = {
            "make": [],
            "model": [],
            "year": []
        };
        Array.from(el.filtersList).forEach(input => {
            if (input.checked) {
            switch(input.name) {
                case 'make':
                    match.make.push(item.dataset.make === input.value);
                    break;
                case 'model':
                    match.model.push(item.dataset.model === input.value);
                    break;
                case 'year':
                    match.year.push(item.dataset.year === input.value);
                    break;
            }}
        });
        return match;
    }

    function isFilter() {
        var filter = false;
        /**
         * some returns true as soon as any of the callbacks return true,
         * short-circuiting the execution of the rest. e.g., break;
         */
        Array.from(el.filtersList).some(input => {
            if (input.checked) {
                filter = true;
            }
        });
        return filter;
    }

    function onFilterChange(input) {
        var filtered = false;
        if (input.checked) {
            filtered = true;
        } else {
            filtered = isFilter();
        }

        if (filtered) {
            el.list.classList.add('filtered');
        } else {
            el.list.classList.remove('filtered');
        }

        Array.from(el.items).forEach(item => {
            var result = match(item),
                matches = [];
            item.classList.remove('selected');

            // console.log(result);

            if (result.make.length) {
                if (result.make.includes(true)) {
                    matches.push(true);
                } else { matches.push(false); }
            }

            if (result.model.length) {
                if (result.model.includes(true)) {
                    matches.push(true);
                } else { matches.push(false); }
            }

            if (result.year.length) {
                if (result.year.includes(true)) {
                matches.push(true);
                } else { matches.push(false); }
            }

            var count = 0;
            for(var i = 0; i < matches.length; ++i){
                if(matches[i] == true)
                    count++;
            }

            if (matches.length && matches.length == count) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }

        });
    }

    function onDocumentReady() {
        el.filters = document.querySelector('.filters');
        el.filtersList = el.filters.querySelectorAll('input');
        el.list = document.querySelector('ul.cars');
        el.items = el.list.querySelectorAll('li');

        Array.from(el.filtersList).forEach(input => {
            // add match count to the label
            input.parentNode.append(` (${matches(input.name, input.value)})`);

            input.addEventListener('change', (event) => {
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