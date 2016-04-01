var jsonp = require('./jsonp');

var gapiurl = '//maps.googleapis.com/maps/api/js?callback=__googleMapsApiOnLoadCallback';

exports.load = function (done) {
    jsonp(gapiurl, '__googleMapsApiOnLoadCallback', done);
};