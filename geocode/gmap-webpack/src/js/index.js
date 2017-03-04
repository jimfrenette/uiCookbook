import '../css/style.css';
import $ from 'jquery';

var gapi = require('./modules/gapi');
var location = require('./modules/location');

gapi.load( function () {
    location.init();
});
