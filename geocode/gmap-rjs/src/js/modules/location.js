define(['jquery','modules/gmap'],
    function($, gmap){
        var location = function(){
            
            // default map coordinates
            var latitude = 38.7916,
	            longitude = -77.3120238;
                
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
                }
            
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
        return {
            init: location
        };
    }
);