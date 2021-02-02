ig.module(
    'game.data'
).requires(
).defines(function () {
    ig.getSetting = function () {
        var currentObject = window;
        var settingString = "";
        for (let arg of arguments) {
            currentObject = currentObject[arg];
            settingString += "." + arg;
            if (!currentObject) {
                throw ("Can't get setting: " + settingString);
            }
        }
        return currentObject;
    }
    _GAME_SETTINGS = {
        UI: {
            SPACING: 15,
        },
        FONT: {
            montserrat: "montserrat"
        },
        /**
         * Resolution should be sync with sizehandler.js
         */
        RESOLUTION: {
            MOBILE: {
                WIDTH: 960,
                HEIGHT: 540
            },
            DESKTOP: {
                WIDTH: 960,
                HEIGHT: 540
            }
        }
    };

    _GAMEPLAY_SETTINGS = {

    };
});
