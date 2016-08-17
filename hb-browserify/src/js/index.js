var data = require('./modules/data');
var list = require('../hbs/people.hbs');

document.querySelector('#people').innerHTML = list(data);