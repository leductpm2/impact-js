ig.module(
    'templates.entities.utils.utils'
).requires(
    'impact.entity',
    'plugins.tween'
).defines(function () {
    /**
     * Check Anim finished or not.
     * @param {*} anim 
     * @param {*} func 
     */
    ig.Entity.prototype.checkAnimFinish = function (anim) {
        return (this.currentAnim == anim && this.currentAnim.loopCount);
    };
    /**
     * Execute function after atime
     * @param {*} time 
     * @param {*} func 
     */
    ig.Entity.prototype.executeAfter = function (time, func) {
        this.tween({}, time, {
            onComplete: function () {
                func();
            }
        }).start();
    };

    ig.Entity.prototype.getCenterPoint = function () {
        return {
            x: this.pos.x + this.size.x * 0.5,
            y: this.pos.y + this.size.y * 0.5
        };
    };
    ig.Entity.prototype.setupAnimationSheet = function (image, row, col) {
        if (image === undefined) {
            throw "No Image Found!";
        }
        if (col === undefined) col = 1;
        if (row === undefined) row = 1;
        var width = image.width / col;
        var height = image.height / row;
        this.animSheet = new ig.AnimationSheet(image.path, width, height);

        this.size.x = width;
        this.size.y = height;
        if (this._useScale) {
            this._size.x = width;
            this._size.y = height;
        }

        if (col == 1 && row == 1) {
            this.addAnim('idle', 1, [0], true);
            this.currentAnim = this.anims.idle;
        }
    };
});

