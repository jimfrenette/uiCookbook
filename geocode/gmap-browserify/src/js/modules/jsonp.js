module.exports = function (url, callbackname, done) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);

    window[callbackname] = done;
};