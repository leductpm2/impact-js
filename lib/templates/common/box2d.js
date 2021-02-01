ig.module(
    'templates.common.box2d'
).requires(
).defines(function () {
    ig.box2d = {
        getHitPoint: function (contact) {
            var point = null;
            var worldManifold = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(worldManifold);
            var numPoints = contact.GetManifold().m_pointCount;           
            for (var i = 0; i < numPoints; i++) {
                point = worldManifold.m_points[i];
            }
            return point;
        },
    };
});

