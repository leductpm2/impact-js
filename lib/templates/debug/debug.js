ig.module(
    'templates.debug.debug'
).requires(
    'impact.game',
    'templates.debug.utils.debug-level',
    'templates.debug.utils.debug-entity',
    'templates.debug.utils.debug-controller'
    /**Custom */
    ,'templates.debug.custom.custom-debug'
    , 'impact.debug.debug'
).defines(function () {
    window._debug_log = window.console["log"].bind(window.console, "[Debug-Log]");
    _debug_log("ENABLE DEBUGGER!!!");
    _DEBUG = {
        LOAD_LEVEL: 1,
        INJECT_DEBUG_CONTROLLER: true,
        INJECT_DEBUG_LEVEL: false,   
        ENTITY: true,    
        CONTROLLER: {
            SCALE_TIME: 1,  //[0, 1]              
            _debugShowBoxes: !true,
        },
    };
    ig.Director.inject({
        init: function (theGame, initialLevels) {
            this.parent(theGame, initialLevels);
            if (_DEBUG.LOAD_LEVEL !== undefined) {
                this.currentLevel = _DEBUG.LOAD_LEVEL;
                _debug_log("Custom debug load level " + this.currentLevel + "(total " + this.levels.length + " levels):", this.levels[this.currentLevel]);
            }
        }
    });
    ig.Game.inject({
        loadLevel: function (data) {
            if (_DEBUG.INJECT_DEBUG_LEVEL) {
                _debug_log("Inject Debug level.")
                data = LevelDebug;
            }
            if (_DEBUG.INJECT_DEBUG_CONTROLLER) {
                _debug_log("Inject Debug Controller.")
                var injectData = {
                    "type": "EntityDebugController",
                    "x": 0,
                    "y": 0,
                    "settings": {}
                }
                data.entities.unshift(injectData);
            }
            this.parent(data);
        }
    });
});
