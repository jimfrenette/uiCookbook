import gmap from './gmap';
import address from './address';

var location = {

  init: function() {
    const latitude = 39.084014922903;
    const longitude = -77.51372591791;

    gmap(
        latitude,
        longitude,
        function(result) {

            let latitudeInput = document.getElementById('latitude');
            let longitudeInput = document.getElementById('longitude');

            console.log('RESULT',result);

            if (result.address) {
                address(result.address);
            }

            latitudeInput.value = result.latitude;
            longitudeInput.value = result.longitude;
        }
    );
  }

};

export default location;
