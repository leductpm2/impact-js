ig.module(
    'templates.debug.utils.debug-controller'
).requires(
    'templates.entities.utils.entity-controller'
).defines(function () {
    EntityDebugController = EntityController.extend({
        ignorePause: true,
        zIndex: 100000,
        _controlArr: {},
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this._initControl();
        },
        addNewControl: function (keyName, callback, description) {
            var keycode = ig.KEY[keyName]
            if (keycode === undefined) throw "Invalid key code!";
            if (this._controlArr[keycode] !== undefined) throw "Key code implemented!";

            ig.input.bind(keycode, keyName);
            description = "Press " + keyName + " for: " + description;
            this._controlArr[keycode] = {
                keyName: keyName,
                callback: callback,
                description: description
            };
            _debug_log(description)
        },
        _initControl: function () {
            this.addNewControl("SUBSTRACT", function () {
                this.totalEntities();
            }.bind(this), "INFO");
        },
        _handleControl: function () {
            Object.keys(this._controlArr).forEach(function (keycode) {
                var control = this._controlArr[keycode];
                if (ig.input.pressed(control.keyName)) {
                    if (typeof (control.callback) === 'function')
                        control.callback();
                }
            }.bind(this));
        },
        update: function () {
            if (_DEBUG.CONTROLLER.SCALE_TIME !== undefined) ig.Timer.timeScale = _DEBUG.CONTROLLER.SCALE_TIME;
            ig.Entity._debugShowBoxes = _DEBUG.CONTROLLER._debugShowBoxes;
            this._handleControl();
        },
        draw: function () {
            var context = ig.system.context;
            context.save();
            ig.canvasDraw.text(ig.game.entities.length, 0, 100, {
                textAlign: "left"
            });
            context.restore();
        },
        getEntity: function (entity) {
            return ig.game.getEntitiesByType(entity)[0];         
        }
    });
});
