define(['jquery','async!http://maps.googleapis.com/maps/api/js'],
    function($, async){
        return {
            init: function gpac(lat, lng, callback) {

                var addrComponents = {
                  street_number: 'short_name',
                  route: 'long_name',
                  establishment: 'long_name',
                  locality: 'long_name',
                  administrative_area_level_1: 'short_name',
                  country: 'short_name',
                  postal_code: 'short_name'
                };
                var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 10});
                var geocoder = new google.maps.Geocoder;
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    anchorPoint: new google.maps.Point(0, -29),
                    draggable: true
                });

                map.setCenter(marker.position);
                marker.setMap(map);

                var result = {
                    address: {},
                    latitude: 0,
                    longitude: 0
                };

                google.maps.event.addListener(marker, 'dragend', function (evt) {
                    geocodeLatLng(geocoder, map, evt.latLng.lat(), evt.latLng.lng());
                });

                function geocodeLatLng(geocoder, map, lat, lng) {

                    var latlng = {lat: lat, lng: lng};

                    geocoder.geocode({'location': latlng}, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[0]) {

                                var i; var type = null;
                                for (i = 0; i < results[0].address_components.length; i++) {
                                    type = results[0].address_components[i].types[0];
                                    if (addrComponents[type]) {
                                        result.address[type] = results[0].address_components[i][addrComponents[type]];
                                    }
                                }
                                result.latitude = lat;
                                result.longitude = lng;
                                if(typeof callback == "function"){
                                    callback(result);
                                }

                            } else {
                                window.alert('No results found');
                            }
                        } else {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                    });
                };

            }
        };
    }
);