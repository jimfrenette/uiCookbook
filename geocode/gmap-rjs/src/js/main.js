'use strict';

// since jQuery is alreday loaded by Joomla
define('jquery', [], function() {
    return jQuery;
});

require.config({
    paths : {
        //create alias to plugins (not needed if plugins are on the baseUrl)
        async: 'require/async'
    }
});

require(['modules/location'], function(location) {
     location.init();
});