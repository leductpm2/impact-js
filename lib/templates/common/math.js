ig.module(
    'templates.common.math'
).requires(
).defines(function () {
    ig.math = {
        distance: function (from, to) {
            var xd = from.x - to.x;
            var yd = from.y - to.y;
            return Math.sqrt(xd * xd + yd * yd);
        },
    }
});

