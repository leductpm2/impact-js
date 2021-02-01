ig.module(
    'templates.entities.buttons'
).requires(
    'templates.entities.utils.entity-button',
    'templates.common.canvas-draw'
).defines(function () {
    EntityButtonSimple = EntityButtonBase.extend({
        btnText: "",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        textBaseline: "middle",
        textColor: "#FFFFFF",
        backgroundColor: "#FF0000",
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        customDraw: function () {
            ig.canvasDraw.roundRect(this.pos.x, this.pos.y, this.size.x, this.size.y, {
                roundRadius: 10,
                fillStyle: this.backgroundColor,
            });
            ig.canvasDraw.text(this.btnText, this.pos.x + this.size.x * 0.5, this.pos.y + this.size.y * 0.5, {
                fontSize: this.fontSize,
                fillStyle: this.textColor,
            });
        },
    });
    EntityButtonImage = EntityButton.extend({
        image: null,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            if (this.image) this.setupAnimationSheet(this.image);
        },
    });
});