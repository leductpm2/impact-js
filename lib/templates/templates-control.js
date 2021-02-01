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
    'templates.entities.entity-controller',
    'templates.entities.entity-custom',
    'templates.entities.entity-blinking',
    /**
    * Utils */
    'templates.utils.common-function',
    'templates.utils.reusable',
    'templates.utils.tween',
    'templates.utils.canvas-draw'
    //'templates.utils.splash-loader'
    // 'templates.custom.custom-debug'
).defines(function () {
    OUT_SIDE = -9999;
    if (window.qlog === undefined) {
        window.qlog = function () { };
    }
    if (window.initCustomLog === undefined) {
        window.initCustomLog = function () { return function () { }; };
    }
});

