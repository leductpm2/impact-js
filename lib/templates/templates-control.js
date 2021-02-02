ig.module(
    'templates.templates-control'
).requires(
    /**
    * common */
    'templates.common.box2d',
    'templates.common.canvas-draw',
    'templates.common.check',
    'templates.common.log',
    'templates.common.math',
    'templates.common.misc',
    'templates.common.random',
    /**
    * Debug */
    // 'templates.debug.debug',

    /**
    * Entity */
    'templates.entities.utils.utils',
    'templates.entities.utils.entity-controller',
    'templates.entities.utils.entity-popup',
    'templates.entities.buttons',
    'templates.entities.simples',
    /**
    * Utils */
    'templates.utils.reusable'
).defines(function () {
    OUT_SIDE = -9999;
    if (window.qlog === undefined) {
        window.qlog = function () { };
    }
    if (window.initCustomLog === undefined) {
        window.initCustomLog = function () { return function () { }; };
    }
});

