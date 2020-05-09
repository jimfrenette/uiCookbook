export default (Component, Selector) => {
    document.addEventListener('DOMContentLoaded', () => {
        [].forEach.call(document.querySelectorAll(Selector), (el) => {
            let options;
            const data = el.dataset;
            
            if (data) {
                options = extractDataFromElement(el);
            }

            new Component({
                el,
                ...options
            });
        });
    });
}

function extractDataFromElement(el) {
    const data = el.dataset;

    return Object.keys(data).filter(function(k) {
        // any data element with a cfg prefix
        return k.split('cfg').length > 1;
    }).reduce(function(newData, k) {
        try {
            // remove prefix, then turn key into camelCase (first letter will be uppercase)
            let prop = k.split('cfg')[1].replace(/^([A-Z])/g, (x, up) => up.toLowerCase());
            
            newData[prop]  = data[k];

            return newData;
        } catch (e) {
            return null;
        }
    }, {});
}

export function toBoolean(val) {
    if (typeof val === 'boolean') {
        return val;
    }

    if (!val || val === '') {
        return undefined;
    }

    if (val === "true") {
        return true;
    }

    if (val === "false") {
        return false;
    }
}
