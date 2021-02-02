ig.module(
    'game.levels.home'
).requires(
    'templates.entities.utils.entity-controller',
    'plugins.fullscreen',
    'game.controllers.settings'
).defines(function () {
    LevelHome = {
        "entities": [
            { "type": "EntityHomeController", "x": 0, "y": 0 },
            { "type": "EntityPointer", "x": 0, "y": 0 }
        ],
        "layer": []
    };
    EntityHomeController = EntityController.extend({
        ignorePause: true,
        preload: {
            background: new ig.Image('media/graphics/game/home/background.png'),
            btnPlay: new ig.Image('media/graphics/game/home/btn-play.png'),
            btnMoreGame: new ig.Image('media/graphics/game/home/btn-moregame.png'),
            btnSettings: new ig.Image('media/graphics/game/home/btn-settings.png'),
            btnFullscreenEnter: new ig.Image("media/graphics/game/home/enter-fullscreen.png"),
            btnFullscreenExit: new ig.Image("media/graphics/game/home/exit-fullscreen.png")
        },
        initChildEntity: function () {
            log(this.className)
            this.log("hereerer")
            this.background = this.spawnEntity(EntitySimpleImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.background
            });
            this.btnFullscreen = this.spawnEntity(ig.FullscreenButton, OUT_SIDE, OUT_SIDE, {
                enterImage: this.preload.btnFullscreenEnter,
                exitImage: this.preload.btnFullscreenExit
            });
            this.btnPlay = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.btnPlay,
                onClickCallback: function () {
                    ig.game.director.nextLevel();
                }.bind(this)
            });
            this.btnSettings = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.btnSettings,
                onClickCallback: function () {
                    if (this.settingsPopup) this.settingsPopup.kill();
                    this.settingsPopup = this.spawnEntity(EntitySettings, OUT_SIDE, OUT_SIDE, {});
                }.bind(this)
            });
            if (_SETTINGS && _SETTINGS.MoreGames && _SETTINGS.MoreGames.Enabled) {
                this.btnMoreGame = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                    image: this.preload.btnMoreGame
                });
            }

            this.btnSettings.initBlinking();
        },
        updatePosition: function () {
            this.background.pos = {
                x: (ig.system.width - this.background.size.x) * 0.5,
                y: (ig.system.height - this.background.size.y) * 0.5
            };
            var spacing = ig.getSetting("_GAME_SETTINGS", "UI", "SPACING");
            this.btnFullscreen.pos = {
                x: spacing,
                y: spacing
            };

            var buttonsCenterPos = {
                x: ig.system.width * 0.5,
                y: ig.system.height * 0.75
            };
            var buttonsOffsets = {
                x: 70,
                y: 70
            };
            this.btnPlay.pos = {
                x: buttonsCenterPos.x - this.btnPlay.size.x * 0.5,
                y: buttonsCenterPos.y - this.btnPlay.size.y * 0.5 - buttonsOffsets.y
            };
            this.btnSettings.pos = {
                x: buttonsCenterPos.x - this.btnSettings.size.x * 0.5,
                y: buttonsCenterPos.y - this.btnSettings.size.y * 0.5 + buttonsOffsets.y
            };
            if (this.btnMoreGame) {
                this.btnSettings.pos = {
                    x: buttonsCenterPos.x - this.btnSettings.size.x * 0.5 + buttonsOffsets.x,
                    y: buttonsCenterPos.y - this.btnSettings.size.y * 0.5 + buttonsOffsets.y
                };
                this.btnMoreGame.pos = {
                    x: buttonsCenterPos.x - this.btnMoreGame.size.x * 0.5 - buttonsOffsets.x,
                    y: buttonsCenterPos.y - this.btnMoreGame.size.y * 0.5 + buttonsOffsets.y
                };
            }
        },

    });
});