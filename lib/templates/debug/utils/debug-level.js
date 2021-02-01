ig.module(
    'templates.debug.utils.debug-level'
).requires(
    'templates.entities.entity-controller'
).defines(function () {
    LevelDebug = {
        "entities":
            [
                {
                    "type": "EntityDebugLevelController",
                    "x": 0,
                    "y": 0
                }
            ],
        "layer": [
        ]
    };
    EntityDebugLevelController = EntityController.extend({
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            _debug_log("EntityDebugLevelController");
        },
        draw: function () {
            this.parent();
            var context = ig.system.context;
            context.save();
            context.restore();
        }
    });
});
