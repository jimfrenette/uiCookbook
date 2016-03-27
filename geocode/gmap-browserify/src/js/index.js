var $ = require('jQuery');
var gapi = require('./modules/gapi');
var location = require('./modules/location');

gapi.load( function () {
    location.init();
});