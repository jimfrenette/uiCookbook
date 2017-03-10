import '../css/style.css';
import jsonp from './modules/jsonp';
import location from './modules/location';

var gapiurl = '//maps.googleapis.com/maps/api/js?callback=__googleMapsApiOnLoadCallback';

var load = function (done) {
    jsonp(gapiurl, '__googleMapsApiOnLoadCallback', done);
};

load( function () {
    location.init();
});
