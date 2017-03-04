var gmap = require('./gmap');

var latitude = 39.084014922903;
var longitude = -77.51372591791;

exports.init = function () {
    gmap.init(
        latitude,
        longitude,
        function(result){
            console.log('RESULT',result);

            if (result.address) {
                _setAddress(result.address);
            }

            $('#latitude').val(result.latitude);
            $('#longitude').val(result.longitude);
        }
    );
};

_setAddress = function(address) {
    var street = [];
    if (address.street_number) {
        street.push(address.street_number);
    }
    if (address.route) {
        street.push(address.route);
    }
    if (street.length > 0) {
        $('#street').val(street.join(' '));
    }
    if (address.locality) {
        $('#locality').val(address.locality);
    }
    if (address.administrative_area_level_1) {
        $('#region').val(address.administrative_area_level_1);
    }
    if (address.country) {
        $('#country').val(address.country);
    }
};