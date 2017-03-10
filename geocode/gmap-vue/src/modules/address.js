export default function(address) {
    let street = [];
    let streetInput = document.getElementById('street');
    let localityInput = document.getElementById('locality');
    let regionInput = document.getElementById('region');
    let countryInput = document.getElementById('country');
    if (address.street_number) {
        street.push(address.street_number);
    }
    if (address.route) {
        street.push(address.route);
    }
    if (street.length > 0) {
        streetInput.value = street.join(' ');
    }
    if (address.locality) {
        localityInput.value = address.locality;
    }
    if (address.administrative_area_level_1) {
        regionInput.value = address.administrative_area_level_1;
    }
    if (address.country) {
        countryInput.value = address.country;
    }
}
