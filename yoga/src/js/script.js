window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let calc = require('./parts/calc.js'),
        form = require('./parts/form.js'),
        input = require('./parts/input.js'),
        lightScroll = require('./parts/lightScroll.js'),
        modal = require('./parts/modal.js'),
        slider = require('./parts/slider.js'),
        tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js');

    calc();
    form();
    lightScroll();
    modal();
    slider();
    tabs();
    timer();
    input();

});