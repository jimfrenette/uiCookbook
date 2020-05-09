var TRUE = true,
    FALSE = false,
    RE_ZIP_CODE = /^\d{5}(?:[-\s]\d{4})?$/,
    RE_EMAIL = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    RE_ALPHA = /^[a-zA-Z._\-\s\']*$/i,
    RE_ADDRESS = /^[a-zA-Z0-9\-.,#\s\'\"\&\/\\;:~?!\^*]{3,}$/i,
    RE_CITY = /^[a-zA-Z0-9\-.,#\s\'\"\&\/\\;:~?!\^*]{2,}$/i,
    RE_STATE = /^[a-zA-Z0-9\-.,#\s\'\"\&\/\\;:~?!\^*]{3,25}$/i;

export default {
    required(value) {
        if (value && value.toString().trim()) {
            return TRUE;
        }

        return false;
    },

    email: function(value) {
        if (RE_EMAIL.test(value)) {
            return TRUE;
        }

        return FALSE;
    },

    maxlength: function(value, max) {
        if (value.length > max) {
            return FALSE;
        }

        return TRUE;
    },

    phone: function(value) {
        if (value === '') {
            return TRUE;
        }

        if (/^[0]/.test(value)) {
            return FALSE;
        }

        if (/^(?:1-?)?(\d)\1\1-?\1\1\1-?\1\1\1\1$/i.test(value)) {
            return FALSE;
        }

        if (!/^(1\s?)?(\([2-9]\d{2}\)|[2-9]\d{2})\s?-?[2-9]\d{2}-?\d{4}$/i.test(value)) {
            return FALSE;
        }

        return TRUE;
    },

    /**
     * if not empty, validate
     * positive integer with an optional leading 'x'
     */
    phone_ext: function(value) {
        if (value.toString().trim().length === 0) {
            return TRUE;
        }

        value = value.replace('x', '');

        if (value >>> 0 === parseFloat(value)) {
            return TRUE;
        }

        return FALSE;
    },

    alpha: function(value) {
        if (!RE_ALPHA.test(value)) {
            return FALSE;
        }

        return TRUE;
    },

    address: function(value) {
        if (!value) {
            return TRUE;
        }

        if (!RE_ADDRESS.test(value)) {
            return FALSE;
        }

        return TRUE;
    },

    state: function(value) {
        if (!value) {
            return TRUE;
        }

        return !RE_STATE.text(value);
    },

    city: function(value) {
        if (!value) {
            return TRUE;
        }

        if (!(RE_CITY).test(value)) {
            return FALSE;
        }

        return TRUE;
    },

    zipcode: function(value) {
        if (!value) {
            return TRUE;
        }

        if (!RE_ZIP_CODE.test(value)) {
            return FALSE;
        }

        return TRUE;
    },
}
