import style from './scss/form.scss';

// for async/await browser support
import 'babel-polyfill';

import {on} from './modules/dom-helpers';
import CompoundField from './modules/compound-field';
import FormValidation from './modules/validation';
import getEnhancedInput from './modules/get-enhanced-input';
import getFormData from './modules/get-form-data';

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
        on(this.config.el, 'click', '.ccpa-disclaimer', (evt) => this.disclaimerClick(evt));
    }

    onInputKeyup(evt) {
        this.checkCompletionState();
    }

    render() {
        new CompoundField({
            el: this.config.el.form.querySelector('.compound-field'),
            fields: [ 'firstName', 'lastName' ]
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

import EntryPoint from './modules/entryPoint';

new EntryPoint(Subscribe, '.subscribe');
