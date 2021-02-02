ig.module(
	'templates.entities.countdown'
).requires(
	'impact.entity'
).defines(function () {
	EntityCountDown = ig.Entity.extend({
		fontSize: 50,
		fontStyle: undefined,
		textAlpha: 1,
		time: 3,
		onFinishCallback: null,
		endText: "START",
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.pos = {
				x: ig.system.width * 0.5,
				y: ig.system.height * 0.5
			};
			this.timer = new ig.Timer(this.time);
			this.pauseTimer();
			this.endText = ig.getSetting("_STRINGS", "GAME", "START");
		},
		pauseTimer: function () {
			this.timer.pause();
			if (this.alphaTween) {
				this.alphaTween.pause();
			}
		},
		unpauseTimer: function () {
			this.timer.unpause();
			if (this.alphaTween) {
				this.alphaTween.resume();
			}
		},
		updatePosition: function () {
			this.pos = {
				x: ig.system.width * 0.5,
				y: ig.system.height * 0.5
			}			
		},
		draw: function () {
			this.parent();
			var currentTimeLeft = this.timer.delta();
			if (currentTimeLeft > 0) {
				if (ig.check.function(this.onFinishCallback)) this.onFinishCallback();
				this.kill();
				return;
			}
			var timeLeft = Math.round(Math.abs(currentTimeLeft));
			if (timeLeft == 0) timeLeft = this.endText;
			ig.canvasDraw.text(timeLeft, this.pos.x, this.pos.y, {
				fontSize: this.fontSize,
				fontStyle: this.fontStyle,
				alpha: this.textAlpha,
				fontWeight: "bold"
			});

			if (this.timer.pausedAt) return; //check if timer Is Paused
			if (this.lastTimeLeft != timeLeft) {
				this.lastTimeLeft = timeLeft;
				this.textAlpha = 1;
				if (this.alphaTween) this.alphaTween.stop();
				this.alphaTween = this.tween({
					textAlpha: 0
				}, 1, {
					onComplete: function () { }
				}).start();
			}

		},
	});
});

