ig.module(
	'templates.entities.utils.entity-controller'
).requires(
	'impact.entity'
).defines(function () {
	Z_INDEX_INCREASE = 1000;
	Z_INDEX_INCRESE_WITH_PARENT = 10;
	EntityController = ig.Entity.extend({
		_childArr: [],
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this._childArr = [];
			this.initChildEntity();
		},		
		spawnEntity: function (entityClass, x, y, settings) {
			var new_zIndex = this.zIndex + Z_INDEX_INCRESE_WITH_PARENT;
			if (settings === undefined) settings = {};
			if (settings.zIndex === undefined) settings.zIndex = new_zIndex;
			if (this.ignorePause) settings.ignorePause = true;

			settings.parentEntity = this;
			var child = ig.game.spawnEntity(entityClass, x, y, settings);
			this._childArr.push(child);

			ig.game.sortEntitiesDeferred();
			return child;
		},
		update: function () {
			this.updatePosition();
			this.parent();
		},
		kill: function () {
			if (!this._childArr) return;
			for (var i = this._childArr.length - 1; i >= 0; i--) {
				var child = this._childArr.pop();
				child.kill();
			}
			this._childArr = null;

			this.parent();
		},
		updateOnSizeChange: function () {
			this.parent();
		},
		updateOnOrientationChange: function () {
			this.parent();
		},
		updatePosition: function () {
			this.updateChildEntity();
		},
		initChildEntity: function () {
		},
		updateChildEntity: function () {
		},
	});
});

