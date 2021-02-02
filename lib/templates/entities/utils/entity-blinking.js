
ig.module(
    'templates.entities.utils.entity-blinking'
).requires(
    'impact.entity'
).defines(function () {
    ig.Entity.inject({
        blinkingTime: 1,
        blinkingTimer: null,
        initBlinking: function (time) {
            if (isNaN(time)) time = 1;
            this.blinkingTime = time;
            this.blinkingTimer = new ig.Timer(this.blinkingTime);
        },
        getBlinking: function () {
            if (this.blinkingTimer) {
                if (this.blinkingTimer.delta() >= this.blinkingTime) {
                    this.blinkingTimer.reset();
                }
            }
            var offsetTime = Math.abs(this.blinkingTimer.delta());
            return offsetTime / this.blinkingTime;
        },
        update: function () {
            if (this.blinkingTimer) {
                if (this.blinkingTimer.delta() >= this.blinkingTime) {
                    this.blinkingTimer.reset();
                }
            }
            this.parent();
        },
        draw: function () {
            if (this.blinkingTimer) {
                var ctx = ig.system.context;
                ctx.save();
                ctx.globalAlpha = this.getBlinking();
                this.parent();
                ctx.restore();
            } else {
                this.parent();
            }
        }
    });
});