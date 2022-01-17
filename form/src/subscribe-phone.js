import style from './scss/form.scss';

import {on} from './modules/dom-helpers';
import CompoundField from './modules/compound-field';
import FormValidation from './modules/validation';
import getEnhancedInput from './modules/get-enhanced-input';
import getFormData from './modules/get-form-data';
import textMasks from './modules/text-masks';

const TEXT_MASK = require('vanilla-text-mask');
const IS_VISIBLE_CLASS = 'is-visible';

/**
 * class configuration for the Subscribe form
 *
 * @type {Object}
 */
export default class Subscribe {
    constructor(options) {
        this.config = {
            initialized: false,
            components: {},
            ...options
        };

        this.config.el = document.querySelector('.subscribe');
        this.config.el.form = this.config.el.querySelector('.form');
        this.config.el.phone = this.config.el.form.querySelector(`input[name="phone"]`);
        this.config.el.phoneExt = this.config.el.form.querySelector(`input[name="phoneExt"]`);
        this.config.el.phoneNumber = this.config.el.form.querySelector(`input[name="phoneNumber"]`);
        this.config.el.confirmation = this.config.el.querySelector('.form-confirmation');
        this.config.el.submit = this.config.el.querySelector('.submit-button');

        this.initialize();
    }

    initialize() {
        this.addEventListeners();

        this.render();
    }

    addEventListeners() {
        on(this.config.el.form, 'click', '.submit-button', (evt) => this.submitForm(evt));
        on(this.config.el.form, 'input', 'input,textarea', (evt) => this.onInputKeyup(evt));
        on(this.config.el.form, 'keyup', 'input,textarea', (evt) => this.onInputKeyup(evt));
        on(this.config.el.form, 'change', 'input,textarea', (evt) => this.onInputKeyup(evt));
        on(this.config.el.form, 'paste', 'input,textarea', (evt) => this.onInputKeyup(evt));
        on(this.config.el.form, 'focusout', 'input,textarea', (evt) => this.onInputKeyup(evt));
    }

    onInputKeyup(evt) {

        if (event.target.id == 'phone-form_id_1') {
            this.phoneInputMask(evt);
        }

        if (event.target.id == 'phoneExt-form_id_1') {
            if (evt.type == 'change') {
                this.onPhoneExtChange(evt);
            }
            if (evt.type == 'focusout') {
                this.onPhoneExtBlur(evt);
            }
        }

        this.checkCompletionState();
    }

    phoneInputMask(evt) {
        if (evt.keyCode == 8 || (evt.originalEvent && evt.originalEvent.inputType == 'deleteContentBackward')) return false;

        if (this.config.el.phone.value === '1' && this.config.el.phone.value.length ==1) {
            if (this.createMask) {
                this.createMask.destroy();
            }
            this.createMask = TEXT_MASK.maskInput({
                inputElement: this.config.el.phone,
                mask: textMasks.isd_phone,
                guide: false
            });
        } else if (this.config.el.phone.value.length == 4 && this.config.el.phone.value.charAt(0) >= 2 && this.config.el.phone.value.charAt(0) <= 9) {
            if (this.createMask) {
                this.createMask.destroy();
            }

            this.createMask = TEXT_MASK.maskInput({
                inputElement: this.config.el.phone,
                mask: textMasks.phone,
                guide: false
            });
        } else if (this.config.el.phone.value.length == 0 || this.config.el.phone.value.length == 1) {
            if (this.createMask) {
                this.createMask.destroy();
            }

            this.createMask = TEXT_MASK.maskInput({
                inputElement: this.config.el.phone,
                mask: textMasks.default,
                guide: false
            });
        }
    }

    onPhoneExtChange(evt) {
        evt.preventDefault();
        // prepend "x" to extension
        let val = this.config.el.phoneExt.value.trim();
        this.config.el.phoneExt.value = val;
        val = val.replace('x','');
        this.config.el.phoneExt.value = `x${val}`;
        this.config.el.phoneExt.setAttribute('maxlength', '7');
    }

    onPhoneExtBlur(evt) {
        evt.preventDefault();
        var val = this.config.el.phoneExt.value.trim();
        if (val === 'x') {
            val = val.replace('x','');
            this.config.el.phoneExt.value = val;
            this.config.el.phoneExt.setAttribute('maxlength', '6');
        }
        FormValidation.validateField(this.config.el.phoneNumber);
    }

    render() {
        const commpoundFieldList = this.config.el.form.querySelectorAll('.compound-field');
        Array.from(commpoundFieldList).forEach(commpoundField => {
            if (commpoundField.closest('.name-fields')) {
                new CompoundField({
                    el: commpoundField,
                    fields: [ 'firstName', 'lastName' ]
                });
            }

            if (commpoundField.closest('.phone-fields')) {
                new CompoundField({
                    el: commpoundField,
                    fields: [ 'phone', 'phoneExt' ]
                });
            }
        });

        const inputs = this.config.el.form.querySelectorAll('.enhanced-input');
        for (let input of inputs) {
            getEnhancedInput({
                el: input
            }, input.querySelector('input,textarea').dataset.fieldType);

            if (input.querySelector('input')) {
                input.querySelector('input').dispatchEvent(new Event('keydown', {}))
            }
        }
    }

    checkCompletionState = () => {

        if (FormValidation.validate(this.config.el.form, true)) {
            this.config.el.submit.disabled = false;
            this.config.el.submit.innerHTML = this.config.el.submit.dataset.complete;
        } else {
            this.config.el.submit.disabled = true;
            this.config.el.submit.innerHTML = this.config.el.submit.dataset.default;
        }
    }

    submitForm = async (evt) => {
        evt.preventDefault();

        const data = getFormData(this.config.el.form);

        // const response = await callService('submitSubscribe', data);
        // mock service call:
        const response = await this.submitSubscribe(data);

        this.onResponse(response || {success: false});
    }

    /**
     * handle response
     * @param response response from service
     */
    onResponse = (response) => {

        this.config.el.form.classList.remove(IS_VISIBLE_CLASS);
        this.config.el.confirmation.classList.add(IS_VISIBLE_CLASS);
    }

    /**
     * Mock service
     */
    submitSubscribe(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data);
            }, 3000);
        });
    }
}

import EntryPoint from './modules/entry-point';

new EntryPoint(Subscribe, '.subscribe');
