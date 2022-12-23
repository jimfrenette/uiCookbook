import './style.scss'

(function() {

    var component = {};

    function initialize() {

    }

    function onDocumentReady() {

        component.wrapper = document.querySelector('.scrollani');


        initialize();
    }


    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());