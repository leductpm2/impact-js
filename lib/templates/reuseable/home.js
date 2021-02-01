ig.module(
    'game.levels.game'
).requires(
    'templates.entities.utils.entity-controller',
    'templates.class.input-controller',
    'templates.class.sound-controller',
    'game.controllers.game-area-controller'
).defines(function () {
    LevelGame = {
        "entities": [
            { "type": "EntityGameController", "x": 0, "y": 0 },
            { "type": "EntityPointer", "x": 0, "y": 0 }
        ],
        "layer": []
    };
    EntityGameController = EntityController.extend({
        ignorePause: true,
        _preload: {
        },
        //////////////////////////////////////////////////////////////
        //////////////////////  TODO  //////////////////////////////
        //////////////////////////////////////////////////////////////        
        initChildEntity: function () {
            this.gameArea = ig.game.spawnEntity(EntityGameAreaController, OUT_SIDE, OUT_SIDE, {});
        },
        updatePosition: function () {
        },
        //////////////////////////////////////////////////////////////
        //////////////////////  CUSTOM  //////////////////////////////
        //////////////////////////////////////////////////////////////        
    });

});