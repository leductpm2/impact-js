ig.module(
	'templates.entities.entity-countdown'
).requires(
	'impact.entity'
).defines(function () {
	EntityCountDown = ig.Entity.extend({
		fontSize: 50,
		fontStyle: undefined,
		time: 3,
		onFinishCallback: null,
		textAlpha: 1,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.pos = {
				x: ig.system.width * 0.5,
				y: ig.system.height * 0.5
			};
			this.timer = new ig.Timer(this.time);
		},
		updatePosition: function () {
			this.pos = {
				x: ig.system.width * 0.5,
				y: ig.system.height * 0.5
			}
			this.parent();
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
			if (timeLeft == 0) timeLeft = _STRINGS.Game.START;
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
			ig.draw.text(timeLeft, this.pos.x, this.pos.y, {
				fontSize: this.fontSize,
				fontStyle: this.fontStyle,
				alpha: this.textAlpha
			});
		},
	});
});

