ig.module(
    'templates.common.log'
).requires(    
).defines(function () {
    // initCustomDebug = function (console) {
    //     var newConsole = {};

    //     if (_DEBUG_LOG_ENABLE) {
    //         for (var m in console)
    //             if (typeof console[m] == 'function')
    //                 newConsole[m] = console[m].bind(console, "[Custom Debug]");
    //     } else {
    //         for (var m in console)
    //             if (typeof console[m] == 'function')
    //                 newConsole[m] = function () { };
    //     }

    //     return newConsole;
    // }
    window.cd = window.console["log"].bind(window.console, "[Quick-Log]");
    window.log = window.console["log"].bind(window.console, "[Quick-Log]");   
});
