ig.module(
    'game.levels.game'
).requires(
    'templates.entities.utils.entity-controller',
    'game.controllers.settings'
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
        preload: {
            background: new ig.Image('media/graphics/game/game/background.png'),
            btnPause: new ig.Image('media/graphics/game/game/btn-pause.png'),
        },
        draw: function () {
            // ig.canvasDraw.drawImage(this.preload.background, ig.system.width * 0.5, ig.system.height * 0.5)
        },
        initChildEntity: function () {
            this.background = this.spawnEntity(EntitySimpleImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.background
            });
            this.btnPause = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.btnPause,
                onClickCallback: function () {
                    if (this.pausePopup) this.pausePopup.kill();
                    this.pausePopup = this.spawnEntity(EntityPause, OUT_SIDE, OUT_SIDE, {});
                }.bind(this)
            });
        },
        updatePosition: function () {
            this.background.pos = {
                x: (ig.system.width - this.background.size.x) * 0.5,
                y: (ig.system.height - this.background.size.y) * 0.5
            };
            var spacing = ig.getSetting("_GAME_SETTINGS", "UI", "SPACING");
            this.btnPause.pos = {
                x: ig.system.width - this.btnPause.size.x * 1 - spacing,
                y: spacing
            };
        },
    });

});