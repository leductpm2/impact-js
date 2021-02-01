ig.module(
    'templates.debug.custom.custom-debug'
).requires(
    'templates.debug.utils.debug-controller'
    // ,'plugins.box2d.debug'
).defines(function () {
    EntityDebugController.inject({
        _initControl: function () {
            this.parent();    
            this.addNewControl("NUMPAD_0", function () {
                var gameArea = ig.game.getEntitiesByType(EntityGameAreaController)[0];
                if (gameArea && gameArea.player) {
                    gameArea.player.car.crash(gameArea.player.car);
                }
            }.bind(this), "CRASH");
            this.addNewControl("NUMPAD_1", function () {
                var gameArea = ig.game.getEntitiesByType(EntityGameAreaController)[0];
                if (gameArea && gameArea.botArr[0]) {
                    gameArea.botArr[0].car.crash(gameArea.player.car);
                }
            }.bind(this), "BOT CRASH");

            this.addNewControl("NUMPAD_2", function () {
                var gameArea = ig.game.getEntitiesByType(EntityGameAreaController)[0];
                if (gameArea && gameArea.botArr[0]) {
                    gameArea.botArr[0].forceDespawn(false);
                }
            }.bind(this), "BOT CRASH BEHIND");
            this.addNewControl("NUMPAD_3", function () {
                var gameArea = ig.game.getEntitiesByType(EntityGameAreaController)[0];
                if (gameArea && gameArea.botArr[0]) {
                    gameArea.botArr[0].forceDespawn(true);
                }
            }.bind(this), "BOT CRASH FRONT");

            this.addNewControl("NUMPAD_5", function () {
                var gameArea = ig.game.getEntitiesByType(EntityScoreController)[0];
                if (gameArea) {
                    gameArea.spawnScore(100, ig.system.width * 0.5, ig.system.height * 0.5);

                }
            }.bind(this), "SCORE");
            this.addNewControl("NUMPAD_6", function () {
                var gameArea = ig.game.getEntitiesByType(EntityGameAreaController)[0];
                if (gameArea) {
                    gameArea.showGameOver();
                }
            }.bind(this), "GAMEOVER");
            this.addNewControl("NUMPAD_7", function () {
                var gameArea = ig.game.getEntitiesByType(EntityGameAreaController)[0];
                if (gameArea && gameArea.player) {
                    gameArea.player.car.imortalTimer = new ig.Timer(_GAME_SETTINGS.PLAYER.IMORTAL_TIME);
                    gameArea.player.car.initBlinking(_GAME_SETTINGS.PLAYER.IMORTAL_TIME / 8);
                }
            }.bind(this), "GAMEOVER");
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            this.parent();
            var gameArea = ig.game.getEntitiesByType(EntityGameAreaController)[0];
            var line = 20;
            if (gameArea && gameArea.player && gameArea.player.car && gameArea.player.car.isReady) {
                var player = gameArea.player;
                var vel = player.car.body.GetLinearVelocity();
                var playerStat =
                    "Lane:" + player.currentLane.toFixed(1) +
                    "| TargetLane:" + player.targetLane.toFixed(1) +
                    "| LEFT :" + player.car.wheelLeft.onGround +
                    "| RIGHT:" + player.car.wheelRight.onGround +
                    "| Vel:" + vel.x.toFixed(1) + "," + vel.y.toFixed(1) +
                    "| AWAKE:" + player.car.body.IsAwake() +
                    "";
                ig.draw.text(playerStat, 0, 10, {
                    textAlign: "left"
                });
            }
            if (gameArea && gameArea.botArr) {
                for (var i = 0; i < gameArea.botArr.length; i++) {
                    var player = gameArea.botArr[i];
                    if (player.car) {
                        var vel = player.car.body.GetLinearVelocity();
                        var playerStat =
                            "Lane:" + player.currentLane.toFixed(1) +
                            "| TargetLane:" + player.targetLane.toFixed(1) +
                            "| LEFT :" + player.car.wheelLeft.onGround +
                            "| RIGHT:" + player.car.wheelRight.onGround +
                            "| Vel:" + vel.x.toFixed(1) + "," + vel.y.toFixed(1) +
                            "";
                        ig.draw.text(playerStat, 0, 10 + line * (i + 1), {
                            textAlign: "left"
                        });
                    }
                }
            }

        }
    });
});
