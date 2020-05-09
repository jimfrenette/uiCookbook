import EnhancedInput from './enhanced-input';

import MASKS from './text-masks';

const textMask = require('vanilla-text-mask');

export default class PhoneInput extends EnhancedInput {
    constructor(options) {
        super(options);

        this.$input.addEventListener('keydown', this._ieIsdPhoneHandle);
        this.$input.addEventListener('keyup', this._onKeyUp)
    }

    //To handle IE specific bug
    _ieIsdPhoneHandle = (evt) => {
        if (this.$input.value === '1 ' && evt.keyCode == 8) {
            this.$input.value = '';
        }
    }

    _onKeyUp = (evt) => {
        if (this.$input.value) {
            this.el.classList.add('is-edited');
        } else {
            this.el.classList.remove('is-edited');
        }

        if (evt.keyCode == 8 || (evt.originalEvent && evt.originalEvent.inputType == 'deleteContentBackward')) return false;

        if (this.$input.value === '1' && this.$input.value.length ==1) {
            if (this.createMask) {
                this.createMask.destroy();
            }

            this.createMask = textMask.maskInput({
                inputElement: this.$input,
                mask: MASKS.isd_phone,
                guide: false
            });
        } else if (this.$input.value.length == 4 && this.$input.value.charAt(0) >= 2 && this.$input.value.charAt(0) <= 9) {
            if (this.createMask) {
                this.createMask.destroy();
            }

            this.createMask = textMask.maskInput({
                inputElement: this.$input,
                mask: MASKS.phone,
                guide: false
            });
        } else if (this.$input.value.length == 0 || this.$input.value.length == 1) {
            if (this.createMask) {
                this.createMask.destroy();
            }

            this.createMask = textMask.maskInput({
                inputElement: this.$input,
                mask: MASKS.default,
                guide: false
            });
        }
    }
}
