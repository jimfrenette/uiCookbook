<template>
  <div id="app">
    <p>{{msg}}</p>

    <div id="map-canvas"></div>
    <label>Street
      <input type="text" id="street" name="street" />
    </label>
    <label>Locality
      <input type="text" id="locality" name="locality" />
    </label>
    <label>Region
      <input type="text" id="region" name="region" />
    </label>
    <label>Country
      <input type="text" id="country" name="country" />
    </label>
    <label>Latitude
      <input type="text" id="latitude" name="latitude" />
    </label>
    <label>Longitude
      <input type="text" id="longitude" name="longitude" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Drag the marker to a location on the map and set input values.'
    }
  }
}
</script>

<style lang="scss">
label {
  display: block;
  width: 300px;
  margin-bottom: 1em;
}

input[type='text'] {
  display: block;
  width: 100%;
}

#map-canvas {
  width: 300px;
  height: 300px;
  margin-bottom: 1em;
}
</style>
