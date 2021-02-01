ig.module('templates.utils.reusable')
    .requires(
        'game.entities.pointer',
        'game.entities.pointer-selector'
    )
    .defines(function () {
        ig.initPointer = function () {
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            if (!this.pointer)
                this.pointer = ig.game.spawnEntity(EntityPointerSelector, 0, 0, {
                    zIndex: 99999
                });
        };
        ig.getPointer = function () {
            var pointer = ig.game.getEntitiesByType(EntityPointer)[0];
            if (!pointer)
                pointer = ig.game.spawnEntity(EntityPointerSelector, 0, 0);
            return pointer;
        };
        ig.anchorTogether = function (entity, parentEntity, offsetX, offsetY) {
            entity.setAnchoredPosition(
                parentEntity.anchoredPositionX + offsetX,
                parentEntity.anchoredPositionY + offsetY,
                parentEntity.anchorType);
        };
        ig.anchorTogetherWithCurrentPos = function (entity, parentEntity) {
            var centerAnchorPos = ig.responsive.toAnchor(0, 0, parentEntity.anchorType);
            var offsetX = entity.pos.x - centerAnchorPos.x;
            var offsetY = entity.pos.y - centerAnchorPos.y;
            entity.setAnchoredPosition(
                offsetX,
                offsetY,
                parentEntity.anchorType);
        };
        ig.anchorCurrentPos = function (entity) {
            var centerAnchorPos = ig.responsive.toAnchor(0, 0, "middle-center");
            entity.setAnchoredPosition(
                entity.pos.x - centerAnchorPos.x,
                entity.pos.y - centerAnchorPos.y,
                "middle-center");
        };

        ig.pauseAllTweens = function () {
            for (var i = 0; i < ig.game.entities.length; i++) {
                if (!ig.game.entities[i].ignorePause) {
                    ig.game.entities[i].pauseTweens();
                }
            }
        };
        ig.resumeAllTweens = function () {
            for (var i = 0; i < ig.game.entities.length; i++) {
                if (!ig.game.entities[i].ignorePause) {
                    ig.game.entities[i].resumeTweens();
                }
            }
        };
        ig.disableItemUnderZIndex = function (zIndex) {
            ig.game.forcePauseTimer = true;
            for (var i = 0; i < ig.game.entities.length; i++) {
                var entity = ig.game.entities[i];
                if (entity.zIndex < zIndex) {
                    if (typeof (entity.enableByZIndex) == 'function') {
                        entity.disableByZIndex();
                    }
                }
            }
        };
        ig.enableItemUnderZIndex = function (zIndex) {
            ig.game.forcePauseTimer = false;
            for (var i = 0; i < ig.game.entities.length; i++) {
                var entity = ig.game.entities[i];
                if (entity.zIndex < zIndex) {
                    if (typeof (entity.enableByZIndex) == 'function') {
                        entity.enableByZIndex();
                    }
                }
            }
        };
        ig.removeKilled = function (array) {
            array = array.filter(function (obj) {
                return !obj._killed;
            });
            return array;
        };
        ig.isAvailable = function (entity) {
            return (entity && !entity._killed);
        };        
    });

