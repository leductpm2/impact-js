ig.module(
    'templates.entities.simples'
).requires(
    'impact.entity',
    'templates.entities.utils.utils',
    'templates.common.canvas-draw'
).defines(function () {
    EntitySimpleImage = ig.Entity.extend({
        image: null,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            if (this.image) this.setupAnimationSheet(this.image);
        },
    });
    EntitySimpleText = ig.Entity.extend({
        draw: function () {
            this.parent();
            ig.canvasDraw.text(this.text, this.pos.x, this.pos.y, this.textData);
        },
    });
});