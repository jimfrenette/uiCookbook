export default {
    'phone': [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ],
    'isd_phone': [ /[1]/, ' ', /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ],
    'default': [ /[1-9]/, /\d/, /\d/, /\d/ ],
}

