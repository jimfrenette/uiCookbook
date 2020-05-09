import { closest } from './dom-helpers';
import FormValidation from './validation';
import MASKS from './text-masks';
import { maskInput } from 'vanilla-text-mask';

export default class EnhancedInput {
    constructor(options) {
        this.el = options.el;

        this.$input = this.el.querySelector('input,textarea');

        this.$input.addEventListener('blur', this._onBlur);
        this.$input.addEventListener('input', this._onKeyUp);
        this.$input.addEventListener('keyup', this._onKeyUp);
        this.$input.addEventListener('change', this._onKeyUp);
        this.$input.addEventListener('paste', this._onKeyUp);

        let mask = this.$input.dataset.mask || MASKS[this.$input.dataset.maskType || options.maskType];

        if (mask) {
            maskInput({
                inputElement: this.$input,
                mask: mask
            });
        }

        this._onKeyUp(); // browsers re-enter field values when back button is pressed, this will ensure the field starts in the correct state
    }

    /**
     * On keyup, show placeholder label if there is any value, otherwise hide it
     */
    _onKeyUp = () => {
        if (this.$input.value) {
            this.el.classList.add('is-edited');
        } else {
            this.el.classList.remove('is-edited');
        }
    }

    _onFocus = () => {
        this.el.classList.add('is-edited');
    }

    _onBlur = () => {
        if (this.$input.value === undefined || this.$input.value === '') {
            this.el.classList.remove('is-edited');
        }

        if (this.$input.getAttribute('name') === 'firstName' || this.$input.getAttribute('name') === 'lastName') {
            const proxyInput = closest(this.el, 'form').querySelector('[name="fullName"]');
            FormValidation.validateField(proxyInput);
        } else {
            setTimeout(() => {
                FormValidation.validateField(this.$input);
            }, 0);
        }
    }
}
