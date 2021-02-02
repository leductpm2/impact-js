ig.module(
    'templates.class.sound-controller'
).requires(
    'impact.impact'
).defines(function () {
    ig.SoundController = ig.Class.extend({
        init: function () {
        },
        land: function (paramObject) {
            ig.game.jumpSound = false;
            ig.soundHandler.sfxPlayer.stop('land');
            ig.soundHandler.sfxPlayer.stop('jump');
            ig.soundHandler.sfxPlayer.play('land');
        },
        jump: function (paramObject) {
            if (ig.game.jumpSound) return;
            ig.game.jumpSound = true;
            ig.soundHandler.sfxPlayer.stop('land');
            ig.soundHandler.sfxPlayer.stop('jump');
            ig.soundHandler.sfxPlayer.play('jump');
        }       
    });
});