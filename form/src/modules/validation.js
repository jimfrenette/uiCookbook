import dom from './dom-helpers';
import messages from './validation-messages.json'; // default validation messages when no data-error-message attribute exists
import validators from './validators';

class Validation {
    constructor() {
        this.validators = validators;
    }

    validate(form, silent = false) {
        var self = this,
            isValid = true;

        self.errorList = [];
        self.i18nValidator = messages[document.documentElement.getAttribute('lang')];

        let inputs = form.querySelectorAll('input[required], select[required], input[data-validators]');

        for (let input of inputs) {
            if (self.validateField(input, silent)) {
                isValid = false;
            }
        }

        return isValid;
    }

    validateField($input, silent = false) {
        var errors = this.getFieldErrors($input);

        if ($input.dataset.validationProxy) {
            let proxiedFields = $input.dataset.validationProxy.split(',');

            for (let i = 0;i < proxiedFields.length;i++) {
                let form = dom.closest($input, 'fieldset');
                let $proxyInput = form.querySelector('[name="' + proxiedFields[i] + '"]');
                errors = errors.concat(this.getFieldErrors($proxyInput));
            }

            if (errors) {
            }
        }

        if (!silent) {
            const validatedEl = dom.prev($input, '.form-validated');
            if (validatedEl) {
                validatedEl.parentNode.removeChild(validatedEl);
            }

            $input.classList.remove('is-error');

            const err = dom.prev($input, '.form-error');
            if (err) {
                err.parentNode.removeChild(err);
            }

            const err2 = dom.prev($input, '.form-error');
            if (err2) {
                err2.parentNode.removeChild(err2);
            }

            $input.removeAttribute('aria-describedby');

            if ($input.dataset.compoundField) {
                let $compoundFieldContainer = dom.closest($input, '.compound-field');
                $compoundFieldContainer && $compoundFieldContainer !== document && $compoundFieldContainer.classList.remove('is-error');
            }
        }

        if (errors.length == 0) {
            if ($input.value.length > 0) {
                if (!silent) {
                    this.addValidated($input);
                }
            } else {
                this.removeValidated($input);
            }
        } else {
            var ariaDescribedby;
            for (let i in errors) {
                if (!silent) {
                    ariaDescribedby = $input.getAttribute('id') ? `error in filed ${$input.getAttribute('id')}` : 'error in field';
                    $input.setAttribute('aria-describedby', ariaDescribedby);
                    this.addError($input, errors[i].message, ariaDescribedby);
                    break;
                }
            }
        }

        // if this is a soft validation, handle normally except report 0 errors
        if ($input.dataset.validationSoft) {
            errors = [];
        }

        return errors.length;
    }

    getFieldErrors($input) {
        var self = this;
        var response = [];
        var type = $input.getAttribute('type');

        self.errorList = [];
        self.i18nValidator = messages[document.documentElement.getAttribute('lang')];

        if ($input.hasAttribute('required') && !validators.required($input.value)) {
            response.push({
                input: $input,
                type: 'required',
                message: self.getErrorMessage($input, 'required')
            });
        }

        if (type === 'email') {
            if (!validators.email($input.value)) {
                response.push({
                    input: $input,
                    type: 'email',
                    message: self.getErrorMessage($input, 'email')
                });
            }
        }

        if ($input.hasAttribute('maxlength') && !validators.maxlength($input.value, $input.getAttribute('maxlength'))) {
            console.log('MAXLEN failed for ' + $input.getAttribute('name'));
            response.push({
                input: $input,
                type: 'maxlength',
                message: self.getErrorMessage($input, 'maxlength')
            });
        }

        var inputValidators = $input.dataset.validators;

        if (inputValidators) {
            var inputValidatorArr = inputValidators.split(',');

            for (let i in inputValidatorArr) {
                try {
                    if (!self.validators[inputValidatorArr[i]]($input.value)) {
                        response.push({
                            input: $input,
                            type: inputValidatorArr[i],
                            message: self.getErrorMessage($input, inputValidatorArr[i])
                        });
                    }
                } catch (e) {

                }
            }
        }

        return response;
    }

    addError($input, errorMessage, ariaDescribedby) {
        var self = this;

        if ($input.dataset.compoundField) {
            let $compoundFieldContainer = dom.closest($input, '.compound-field');
            $compoundFieldContainer && $compoundFieldContainer !== document && $compoundFieldContainer.classList.add('is-error');
        }

        if ($input.dataset.skipValidation === 'true') {
            return;
        }

        $input.dispatchEvent(new CustomEvent('input:invalid'));

        this.resetState($input);

        $input.classList.add('is-error');

        if ($input.matches('select')) {
           const options = dom.siblings($input, '.select-options')[0];
           options.insertAdjacentHTML('afterend', '<div class="form-error-icon"></div>');
           options.insertAdjacentHTML('afterend', `<div class="form-error" id="${ariaDescribedby}"> ${errorMessage} </div>`);

            dom.next($input, '.select-trigger').classList.add('is-error');
        } else {
            if ($input.dataset.compoundField) {
                const compoundField = dom.closest($input, '.compound-field');
                compoundField.insertAdjacentHTML('afterend', '<div class="form-error-icon"></div>')
                compoundField.insertAdjacentHTML('afterend', `<div class="form-error"> ${errorMessage} </div>`);
            } else {
                $input.insertAdjacentHTML('afterend', '<div class="form-error-icon"></div>');
                $input.insertAdjacentHTML('beforebegin', `<div class="form-error" id="${ariaDescribedby}"> ${errorMessage} </div>`);
            }
        }

        self.errorList.push($input.getAttribute('name'));
    }

    addValidated($input) {
        this.resetState($input);

        $input.classList.add('is-valid');
        $input.insertAdjacentHTML('afterend', '<div class="form-valid-icon"></div>');

        if (dom.next($input, '.select-trigger')) {
            dom.next($input, '.select-trigger').classList.add('is-error');
        }
    }

    /**
     * Called to remove validation icon when a field has no errors, but is empty (non-required field)
     * @param {*}
     */
    removeValidated($input) {
        this.resetState($input);

        $input.classList.remove('is-valid');

        const validIcon = dom.siblings($input, '.form-valid-icon')[0];
        validIcon && validIcon.removeChild(validIcon);

        const errorIcon = dom.siblings($input, '.form-error-icon')[0];
        errorIcon && errorIcon.removeChild(errorIcon);
    }

    resetState($input) {
        const err = dom.next($input, '.form-error');
        err && err.parentElement.removeChild(dom.next($input, '.form-error'));

        const errorIcon = dom.siblings($input, '.form-error-icon');
        errorIcon[0] && errorIcon[0].parentElement.removeChild(errorIcon[0]);

        const validIcon = dom.siblings($input, '.form-valid-icon');
        validIcon[0] && validIcon[0].parentElement.removeChild(validIcon[0]);

        if ($input.matches('select')) {
            const icons = dom.siblings($input, '.form-error,.form-valid-icon,.form-error-icon');
            for (let icon of icons) {
                icon.parentElement.removeChild(icon);
            }
        }

        if ($input.dataset.compoundField) {
            let $compoundFieldContainer = dom.closest($input, '.compound-field');
            const icons = dom.siblings($compoundFieldContainer, '.form-error,.form-valid-icon,.form-error-icon');
            for (let icon of icons) {
                icon.parentElement.removeChild(icon);
            }
        }
    }

    getErrorMessage(input, errorType) {
        var self = this,
            inputError = input.dataset.errorMessage;

        if (inputError) {
            return self.i18nValidator[inputError] || inputError;
        } else {
            return self.i18nValidator[errorType] || self.i18nValidator.required;
        }
    }
}

// export an instance
export default new Validation();
