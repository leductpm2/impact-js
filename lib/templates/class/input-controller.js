ig.module(
    'templates.class.input-controller'
).requires(
    'impact.impact'
).defines(function () {
    INPUT_CODE = {
        NOTHING: 0,
        SPACE: 1,
        LEFT: 2,
        RIGHT: 4,
        UP: 8,
        DOWN: 16,
        BRAKE: 32
    };
    "use strict";
    ig.InputController = ig.Class.extend({
        init: function (paramObject) {
            ig.input.bind(ig.KEY.LEFT_ARROW, 'LEFT_ARROW');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'RIGHT_ARROW');
            ig.input.bind(ig.KEY.UP_ARROW, 'UP_ARROW');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'DOWN_ARROW');
            // ig.input.bind(ig.KEY.SPACE, 'SPACE');

            ig.input.bind(ig.KEY.A, 'A');
            ig.input.bind(ig.KEY.D, 'D');
            ig.input.bind(ig.KEY.W, 'W');
            ig.input.bind(ig.KEY.S, 'S');
            // ig.input.bind(ig.KEY.SHIFT, 'SHIFT');
        },
        handleInput: function (paramObject) {
            var control = ig.game.getEntitiesByType(EntityGameAreaController)[0];
            if (!control) return;
            var player = control.player;
            if (!player.car) return;
            if (!player.car.isReady) return;

            switch (true) {
                case (ig.input.pressed('LEFT_ARROW') || ig.input.state('LEFT_ARROW') ||
                    ig.input.pressed('A') || ig.input.state('A')): {                   
                        if (player.car.isFlying) {
                            player.car.currentInput |= INPUT_CODE.LEFT;
                        } else {
                            player.car.currentInput |= INPUT_CODE.BRAKE;
                        } break;
                    } break;
                case (ig.input.pressed('RIGHT_ARROW') || ig.input.state('RIGHT_ARROW') ||
                    ig.input.pressed('D') || ig.input.state('D')): {                   
                        if (player.car.isFlying) {
                            player.car.currentInput |= INPUT_CODE.RIGHT;
                        } else {
                            player.car.currentInput |= INPUT_CODE.SPACE;
                        } break;
                    }
            }
            switch (true) {
                case (ig.input.pressed('UP_ARROW') || ig.input.state('UP_ARROW') ||
                    ig.input.pressed('W') || ig.input.state('W')): {
                        player.car.currentInput |= INPUT_CODE.UP;
                    } break;
                case (ig.input.pressed('DOWN_ARROW') || ig.input.state('DOWN_ARROW') ||
                    ig.input.pressed('S') || ig.input.state('S')): {
                        player.car.currentInput |= INPUT_CODE.DOWN;
                    } break;
            }
        },
    });
});