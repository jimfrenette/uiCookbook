import {on} from './dom-helpers';

const IS_INTERACTED_WITH_CLASS = 'is-interacted-with';
const IS_INTERACTING_WITH_CLASS = 'is-interacting-with';
const IS_EDITED_CLASS = 'is-edited';
const IS_FOCUSED_CLASS = 'is-focused';
const IS_ACTIVE_CLASS = 'is-active';

export default class CompoundField {
    constructor(options) {
        this.el = options.el;

        this._interacted = false;
        this._interactedFields = [];
        this._fields = options.fields;
        this._isActive = false;

        this._addEventListeners();
    }

    _addEventListeners() {
        on(this.el, 'blur', 'input', () => {
            debugger;
        });

        const inputs = this.el.querySelectorAll('.enhanced-input:not(.compound-field-proxy) input');

        for (let input of inputs) {
            input.addEventListener('blur', this._onFieldBlur);
        }

        this.el.querySelector('.compound-field-proxy input').addEventListener('focus', this._onProxyFocus);
        on(this.el, 'focus', 'input', this._onFieldFocused);
    }

    _onFieldFocused(evt) {
        if (!this._isActive) {
            this._isActive = true;
            this._onProxyFocus();
        }
    }

    _onFieldBlur = (evt) => {
        this.el.querySelector('.compound-field-proxy .textfield').value = this._getCompoundValue();
        this.focusedTimeout = setTimeout(() => {
            if (!this.el.querySelectorAll('input:focus').length) {

                this._deactivate();
                this._setInteracted();
            }
        }, 10);

        this._setFieldInteracted(evt.target, true);
    }

    _onProxyFocus = () => {
        this._resetInteracted();

        // apply class to use for css rules - background color of technically-not-focused input in group, etc.
        this.el.classList.add(IS_INTERACTING_WITH_CLASS);

        this.el.querySelector(`.textfield[name="${this._fields[0]}"]`).focus();
    }

    _setFieldInteracted($input) {
        this._interactedFields.push($input.getAttribute('name'));
    }

    _setInteracted() {
        const compoundValue = this._getCompoundValue();
        this._interacted = true;

        this.el.classList.add(IS_INTERACTED_WITH_CLASS);
        this.el.classList.remove(IS_INTERACTING_WITH_CLASS);

        this.el.querySelector('.compound-field-proxy .textfield').value = compoundValue;

        if (compoundValue && compoundValue.length > 0) {
            this.el.querySelector('.compound-field-proxy').classList.add(IS_EDITED_CLASS);
        }
    }

    _resetInteracted() {
        this._interactedFields = [];

        this._interacted = false;

        this.el.classList.remove(IS_INTERACTED_WITH_CLASS);

        this.el.querySelector('.compound-field-proxy').classList.remove(IS_EDITED_CLASS);
    }

    _deactivate() {
        this._isActive = false;
        this.el.classList.remove(IS_FOCUSED_CLASS);
    }

    _activate() {
        this._isActive = true;
        this.el.classList.add(IS_FOCUSED_CLASS, IS_ACTIVE_CLASS);
    }

    _getCompoundValue() {
        var val = '';

        for (var i = 0;i < this._fields.length;i++) {
            val += this.el.querySelector(`.textfield[name="${this._fields[i]}"]`).value + ' ';
        }

        val = val.trim();

        return val;
    }
}
