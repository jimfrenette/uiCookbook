export default {
    matches,
    prev,
    next,
    siblings,
    on,
    closest
}

export function matches(elem, selector) {
    const isMsMatch = 'msMatchesSelector' in elem && elem.msMatchesSelector(selector);
    const isMatchSelector = 'matchesSelector' in elem && elem.matchesSelector(selector)
    const isMatch = 'matches' in elem && elem.matches(selector);
    // Test the element to see if it matches the provided selector
    // use different methods for compatibility
    return isMsMatch || isMatchSelector || isMatch;
    // Return the result of the test
    // If any of the above variables is true, the return value will be true
}

export function prev(el, selector) {
    if (el.previousElementSibling) {
        if (matches(el.previousElementSibling, selector)) {
            return el.previousElementSibling;
        } else {
            return prev(el.previousElementSibling, selector);
        }
    }

    return false;
}

export function next(el, selector) {
    if (el.nextElementSibling) {
        if (matches(el.nextElementSibling, selector)) {
            return el.nextElementSibling;
        } else {
            return prev(el.nextElementSibling, selector);
        }
    }

    return false;
}

export function siblings(el, selector) {
    return Array.prototype.filter.call(el.parentNode.children, function (child) {
        return matches(child, selector);
    }) || [];
}

export function on(el, evtName, selector, callback) {
    el.addEventListener(evtName, (evt) => {
        if (matches(evt.target, selector)) {
            callback(evt);
        }
    });
}


export function closest(elem, selector) {
    // This allows for matching based on any selector, not just a single class.
    elem = elem.parentElement || elem.parentNode;

    for (; elem && elem !== document; elem = elem.parentNode) {
        // Traverse up the dom until document is reached
        if (matches(elem, selector)) {
            // Test each element to see if it matches. If it does, return it.
            return elem
        }
    }
    return null;
}
