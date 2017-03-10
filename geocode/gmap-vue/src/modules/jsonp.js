export default function (url, callbackname, done) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.setAttribute('async', '');
    // defer if async unsupported
    script.setAttribute('defer', '');

    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);

    window[callbackname] = done;
};
