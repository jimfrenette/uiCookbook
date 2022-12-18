import './style.scss'

(function() {

    var component = {};

    function videoLoaded(event) {
        component.wrapper.style.height = `${component.assetsWrapper.clientHeight}px`;

        const scrollspeed = event.target.duration * 1000;

        component.spacer.style.height = `${scrollspeed}px`;

        component.wrapper.addEventListener('scroll', (scrollEvent) => {
            let scrollableHeight = 10000 - scrollEvent.target.clientHeight;

            let currentTime = (scrollEvent.target.scrollTop * event.target.duration) / scrollableHeight;

            console.log(
                'ScrollY',scrollEvent.target.scrollTop,
                'ScrollableH',scrollableHeight,
                'VideoLen',event.target.duration,
                'CurrentTime',currentTime);

            event.target.currentTime = currentTime;
        });
    }

    function initVideo() {
        if (!component.video) return;

        console.log(component.video);

        component.video.addEventListener('loadeddata', component.videoLoaded);
    }

    function handleResize() {
        component.wrapper.style.height = `${component.assetsWrapper.clientHeight}px`;
    }

    function initialize() {
        window.addEventListener('resize', () => {
            handleResize();
        }, false);

        initVideo();
    }

    function onDocumentReady() {
        component.assetsWrapper = document.querySelector('.assets-wrapper');

        component.spacer = document.querySelector('.video-scroll-spacer');

        component.video = document.querySelector('.video-scroll__video');

        component.wrapper = document.querySelector('.video-scroll');

        component.videoLoaded = videoLoaded.bind(this);

        initialize();
    }


    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());