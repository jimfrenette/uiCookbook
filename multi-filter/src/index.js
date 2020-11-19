import './style.scss'

(function() {

    var el = {};

    function sortStr(param) {
        var sorted;
        const items = Array.from(el.items, function(item) {
            return {
                str: `${item.dataset.year}-${item.dataset.make}-${item.dataset.model}`,
                li: item
            }
        });
        if (param == 'z-a') {
            sorted = items.sort((a, b) => a.str < b.str ? 1 : -1);
        } else {
            sorted = items.sort((a, b) => a.str > b.str ? 1 : -1);
        }
        sorted.forEach((obj) => el.list.appendChild(obj.li));
    }

    function sortPrice(param) {
        Array.from(el.items).sort(function(a, b) {
            if (param == '9-1') {
                return b.dataset.price - a.dataset.price;
            } else {
                return a.dataset.price - b.dataset.price;
            }
        }).forEach((li) => el.list.appendChild(li));
    }

    function onSortChange(select) {
        switch(select.value) {
            case '1-9':
            case '9-1':
                sortPrice(select.value);
                break;
            default:
                sortStr(select.value);
        }
    }

    function inRange(num, range) {
        return (num >= range.split('-')[0] && num <= range.split('-')[1]);
    }

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
                case 'price':
                    if (inRange(item.dataset.price, value)) {
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
            "price": [],
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
                case 'price':
                    match.price.push(inRange(item.dataset.price, input.value));
                    break;
                case 'year':
                    match.year.push(item.dataset.year === input.value);
                    break;
            }}
        });
        return match;
    }

    function renderCount(count) {
        el.heading.innerHTML = `${count} Matches`;
    }

    function applyFilter() {
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

            if (result.price.length) {
                if (result.price.includes(true)) {
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
            applyFilter();
        } else {
            el.list.classList.remove('filtered');
            // render total count
        }
    }

    function onDocumentReady() {
        el.heading = document.querySelector('.cars-heading');
        el.sort = document.querySelector('.sort select');
        el.filters = document.querySelector('.filters');
        el.filtersList = el.filters.querySelectorAll('input');
        el.list = document.querySelector('ul.cars');
        el.items = el.list.querySelectorAll('li');
        el.itemsCount = el.items.length;

        renderCount(el.itemsCount);

        Array.from(el.filtersList).forEach(input => {
            // add match count to the label
            input.parentNode.append(` (${matches(input.name, input.value)})`);

            input.addEventListener('change', (event) => {
                onFilterChange(event.target);
            });
        });

        el.sort.addEventListener('change', (event) => {
            onSortChange(event.target);
        });
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());
