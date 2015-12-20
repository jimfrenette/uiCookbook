# uiCookbook

## Easy Browsersync Server

*   [/easybs](/easybs)
  
    An HTML 5 Template with a NPM package config to install a minimal set of development tools including a Browsersync server and Gulp task runner.

## Geocode

### Google Maps
 
* 	[/geocode/gmap-rjs](/geocode/gmap-rjs)
   
	uses requirejs with an async plugin to load the google maps api, no key required.  
	dragging the marker to a location in the map retrieves location data and sets values in text inputs.
	[more info](http://jimfrenette.com/2015/11/googlemap-requirejs/ "Blog post")

```
# installs requirejs, requirejs optimizer, gulp and browsersync
$ npm install

# installs requirejs async plugin
$ bower install

# copies requirejs and the async plugin from local package manager folders into the app
$ gulp copy

# requirejs optimization from /src/js into /js
$ node node_modules/requirejs/bin/r.js -o require.build.js

# run
$ gulp server
```
