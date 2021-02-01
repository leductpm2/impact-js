
ig.module(
    'templates.entities.utils.entity-animation'
).requires(
    'impact.animation'
).defines(function () {
    ig.Animation.inject({
        scale: { x: 1, y: 1 },
        useScale: false,
        draw: function (targetX, targetY) {
            if (!this.useScale) {
                this.parent(targetX, targetY);
                return;
            }
            var translateScaleX = 0;
            var translateScaleY = 0;
            var scale = ig.system.scale;
            ig.system.context.save();
            var originX = targetX + (this.sheet.width / 2);
            var originY = targetY + (this.sheet.height / 2);
            ig.system.context.translate(originX * scale, originY * scale);
            ig.system.context.scale(this.scale.x, this.scale.y);
            ig.system.context.translate(-originX * scale, -originY * scale);
            this.parent(targetX + translateScaleX, targetY + translateScaleY);
            ig.system.context.restore();
        }
    });
});