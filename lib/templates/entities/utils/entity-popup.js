ig.module(
	'templates.entities.utils.entity-popup'
).requires(
	'templates.entities.entity-controller'
).defines(function () {
	EntityPopup = EntityController.extend({
		onKillCallback: null,
		init: function (x, y, settings) {
			settings.zIndex = 999999;
			this.parent(x, y, settings);
			ig.disableItemUnderZIndex(this.zIndex);
		},
		draw: function () {
			this.parent();
			ig.canvasDraw.roundRect(0, 0, ig.system.width, ig.system.height,
				{
					fillStyle: "rgba(0,0,0,0.75)"
				});
		},
		kill: function () {
			ig.enableItemUnderZIndex(this.zIndex);
			if (ig.check.function(this.onCloseCallback)) {
				this.onCloseCallback();
			}
			this.parent();
		},
		updatePosition: function () {
			this.pos = {
				x: ig.system.width * 0.5 - this.size.x * 0.5,
				y: ig.system.height * 0.5 - this.size.y * 0.5
			}
			this.parent();
		},
		initChildEntity: function () {
			this.parent();
		},
		updateChildEntity: function () {
			this.parent();
		},
	});
});

