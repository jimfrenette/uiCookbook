import style from '../sass/style.scss'
import Lazyimage from './lazyimage'
import Lightbox from './lightbox'

new Lazyimage();

new Lightbox({
    name: 'lightbox',
    source: '.photogrid',
    opener: 'li',
    type: 'slider'
});
