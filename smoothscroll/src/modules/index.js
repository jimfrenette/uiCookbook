import easings from './easings';

export default {
    scrollWindow,
    scrollElement
}

function scrollElement(el, destination, duration = 300, easing = 'linear', callback) {
    const start = el.scrollLeft;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const elWidth = el.offsetWidth;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetLeft;
    const destinationOffsetToScroll = destinationOffset;

    if ('requestAnimationFrame' in window === false) {
      el.scrollLeft = destinationOffsetToScroll;
      if (callback) {
        callback();
      }
      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      el.scrollLeft = Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start);

      if (el.scrollLeft === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
}

const getStartTime = () => 'now' in window.performance ? performance.now() : new Date().getTime();

function scrollHandler(scrollOptions) {
  const {
    callback,
    duration,
    easing,
    start,
    startTime,
    offsetToScroll,
    finished,
    scroller
  } = scrollOptions;
  if ('requestAnimationFrame' in window === true) {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    const ypos = Math.ceil((timeFunction * (offsetToScroll - start)) + start);
    scroller(ypos);
    if (finished() !== true) {
      requestAnimationFrame(() => {
        scrollHandler(scrollOptions)
      });
    }
  } else {
    scroller(offsetToScroll);
  }
  if (finished()) {
    if (callback) {
      callback();
    }
  }
}

function scrollWindow(dest, duration = 200, easing = 'linear', callback) {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowHeight = window.innerHeight;
    const offset = typeof dest === 'number' ? dest : dest.offsetTop;
    const offsetToScroll = Math.round(
      documentHeight - offset < windowHeight ?
      documentHeight - windowHeight :
      offset
    );
    const scrollOptions = {
      callback,
      duration,
      easing,
      offsetToScroll,
      start: window.pageYOffset,
      startTime: getStartTime(),
      finished() {
        return window.pageYOffset >= offsetToScroll;
      },
      scroller(ypos) {
        window.scroll(0, ypos);
      }
    }
    setTimeout(() => {
        scrollHandler(scrollOptions);
    }, 200); // Need to wait until scrollOptions get calculated
}

function scrollElement(elToScroll, dest, centerOffset = 0, duration = 200, easing = 'linear', callback) {
  if (typeof elToScroll === 'string') {
    elToScroll = document.querySelector(elToScroll);
  } else if (elToScroll instanceof HTMLElement !== true) {
    console.error('scrollElement: "elToScroll" must either be a selector or an HTMLElement');
  }
  if (typeof dest === 'string') {
    dest = document.querySelector(dest);
  } else if (dest instanceof HTMLElement !== true) {
    console.error('scrollElement: "dest" must either be a selector or an HTMLElement');
  }
  let offset = Math.floor(
    centerOffset > 0 ?
    dest.offsetTop - elToScroll.clientHeight / centerOffset :
    dest.offsetTop
  );
  const offsetToScroll = Math.floor(
    offset > elToScroll.scrollHeight - elToScroll.clientHeight ?
    elToScroll.scrollHeight - elToScroll.clientHeight :
    offset
  );
  const scrollOptions = {
    callback,
    duration,
    easing,
    offsetToScroll,
    start: elToScroll.scrollTop,
    startTime: getStartTime(),
    finished() {
      return elToScroll.scrollTop >= offsetToScroll;
    },
    scroller(ypos) {
      elToScroll.scrollTop = ypos;
    }
  }
  scrollHandler(scrollOptions);
}
