ig.module(
    'game.controllers.settings'
).requires(
    'templates.entities.utils.entity-popup'
).defines(function () {

    EntitySettings = EntityPopup.extend({
        ignorePause: true,
        preload: {
            background: new ig.Image('media/graphics/game/settings/background.png'),
            btnHome: new ig.Image('media/graphics/game/settings/btn-home.png'),
            btnReplay: new ig.Image('media/graphics/game/settings/btn-replay.png'),
            btnResume: new ig.Image('media/graphics/game/settings/btn-resume.png')
        },
        title: "",
        onKillCallback: null,
        init: function (x, y, settings) {
            this.spacing = ig.getSetting("_GAME_SETTINGS", "UI", "SPACING");
            this.title = "SETTINGS";
            this.parent(x, y, settings);
        },
        kill: function () {
            if (ig.check.function(this.onKillCallback)) {
                this.onKillCallback();
            }
            this.parent();
        },
        initChildEntity: function () {
            this.background = this.spawnEntity(EntitySimpleImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.background
            });
            this.title = this.spawnEntity(EntitySimpleText, OUT_SIDE, OUT_SIDE, {
                text: this.title,
                textData: {
                    fontSize: 50,
                    textBaseline: "top"
                }
            });
            this.initButtons();
        },
        updatePosition: function () {
            this.background.pos = {
                x: (ig.system.width - this.background.size.x) * 0.5,
                y: (ig.system.height - this.background.size.y) * 0.5
            };
            this.title.pos = {
                x: this.background.pos.x + this.background.size.x * 0.5,
                y: this.background.pos.y + this.spacing
            };
            this.updateButtons();
        },
        initButtons: function () {
            this.btnHome = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.btnHome,
                onClickCallback: function () {
                    this.kill();
                }.bind(this)
            });
        },
        updateButtons: function () {
            var buttonsCenterPos = {
                x: this.background.pos.x + this.background.size.x * 0.5,
                y: this.background.pos.y + this.background.size.y - this.spacing
            };
            this.btnHome.pos = {
                x: buttonsCenterPos.x - this.btnHome.size.x * 0.5,
                y: buttonsCenterPos.y - this.btnHome.size.y * 0.5 * 2
            };
        },
    });
    EntityPause = EntitySettings.extend({
        init: function (x, y, settings) {
            this.title = "PAUSED";
            this.parent(x, y, settings);
        },
        initButtons: function () {
            this.btnHome = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.btnHome,
                onClickCallback: function () {
                    ig.game.director.jumpTo(LevelHome);
                }.bind(this)
            });
            this.btnReplay = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.btnReplay,
                onClickCallback: function () {
                    ig.game.director.reloadLevel();
                }.bind(this)
            });
            this.btnResume = this.spawnEntity(EntityButtonImage, OUT_SIDE, OUT_SIDE, {
                image: this.preload.btnResume,
                onClickCallback: function () {
                    this.kill();
                }.bind(this)
            });
        },
        updateButtons: function () {
            var offsetX = 100;
            var buttonsCenterPos = {
                x: this.background.pos.x + this.background.size.x * 0.5,
                y: this.background.pos.y + this.background.size.y - this.spacing
            };
            this.btnHome.pos = {
                x: buttonsCenterPos.x - this.btnHome.size.x * 0.5 - offsetX,
                y: buttonsCenterPos.y - this.btnHome.size.y * 0.5 * 2
            };
            this.btnReplay.pos = {
                x: buttonsCenterPos.x - this.btnHome.size.x * 0.5,
                y: buttonsCenterPos.y - this.btnHome.size.y * 0.5 * 2
            };
            this.btnResume.pos = {
                x: buttonsCenterPos.x - this.btnHome.size.x * 0.5 + offsetX,
                y: buttonsCenterPos.y - this.btnHome.size.y * 0.5 * 2
            };
        },
    });
});

