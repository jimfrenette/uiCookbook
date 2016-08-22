var data = require('./modules/data');
var list = require('../hbs/people.hbs');

var Handlebars = require("hbsfy/runtime");

var compare = require('./modules/hb-helpers/compare');

Handlebars.registerHelper('compare', compare);

document.querySelector('#people').innerHTML = list(data);