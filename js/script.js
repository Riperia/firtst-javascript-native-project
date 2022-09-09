import tabs from './modules/tabs';
import calc from './modules/calc';
import timer from './modules/timer';
import cards from './modules/cards';
import form from './modules/form';
import modalka from './modules/modalka';
import slider from './modules/slider';


window.addEventListener('DOMContentLoaded', () => {
     tabs();
     calc();
     timer();
     cards();
     form();
     modalka('[data-modal]','.modal');
     slider();



});
