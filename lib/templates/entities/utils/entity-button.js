ig.module(
    'templates.entities.utils.entity-button'
).requires(
    'impact.entity'
).defines(function () {
    BUTTON_SOUND_STATE = {
        CLICK: 0,
        RELEASE: 1,
    };

    EntityButtonBase = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        size: new Vector2(5, 5),
        zIndex: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            if (!this._visible) return;
            this.parent();
            if (ig.check.function(this.customDraw)) this.customDraw();
        },
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////      
        _visible: true,
        _enabled: true,
        _enableByZIndex: true,
        setVisible: function (visible) {
            if (visible) {
                this._visible = true;
                this._enabled = this._previousEnable || true;
                this._previousEnable = null;
            } else {
                this._visible = false;
                this._previousEnable = this._enabled;
                this._enabled = false;
            }
        },
        enable: function () { this._enabled = true; },
        disable: function () { this._enabled = false; },
        enableByZIndex: function () { this._enableByZIndex = true; },
        disableByZIndex: function () { this._enableByZIndex = false; },
        canFunction: function () {
            return this._enabled && this._visible && this._enableByZIndex;
        },
        _clicking: false,
        _mouseOver: false,
        onClickingCallback: null,
        onClickCallback: null,
        clicked: function () {
            if (!this.canFunction()) return false;
            this._clicking = true;
            return true;
        },
        clicking: function () {
            if (!this.canFunction()) return false;
            this._clicking = true;
            if (ig.check.function(this.onClickingCallback)) {
                this.onClickingCallback();
            }
            return true;
        },
        released: function () {
            if (!this.canFunction()) return false;
            if (!this._clicking) return false;
            this._clicking = false;

            if (ig.check.function(this.onClickCallback)) {
                this.onClickCallback();
            }
            return true;
        },
        leave: function () {
            this._mouseOver = false;
            this._clicking = false;

            return true;
        },
        over: function () {
            if (ig.ua.mobile) return;
            this._mouseOver = true;
            return true;
        },
    });


    BUTTON_SOUND_STATE = {
        CLICK: 0,
        RELEASE: 1,
    };
    EntityButtonBase.inject({        
        playSound: function (soundState) {
            switch (soundState) {
                case BUTTON_SOUND_STATE.RELEASE: {
                    ig.soundHandler.sfxPlayer.stop('click');
                    ig.soundHandler.sfxPlayer.play('release');
                } break;
                case BUTTON_SOUND_STATE.CLICK: {
                    ig.soundHandler.sfxPlayer.stop('release');
                    ig.soundHandler.sfxPlayer.play('click');
                } break;
            }
        },
        clicked: function () {
            if (this.parent()) {
                this.playSound(BUTTON_SOUND_STATE.CLICK);
            }
        },
        released: function () {
            if (this.parent()) {
                this.playSound(BUTTON_SOUND_STATE.RELEASE);
            }
        },
    });

    DEFAULT_BUTTON_SCALE = {
        OVER: 0.95,
        CLICKING: 0.9,
    };
    EntityButtonBase.prototype._baseDraw = EntityButtonBase.prototype.draw;
    EntityButtonBase.prototype._currentButtonScale = { x: 1, y: 1 };
    EntityButtonBase.prototype.draw = function () {
        this._currentButtonScale = { x: 1, y: 1 };
        if (this.canFunction()) {
            if (this._mouseOver) {
                this._currentButtonScale = { x: DEFAULT_BUTTON_SCALE.OVER, y: DEFAULT_BUTTON_SCALE.OVER };
            }
            if (this._clicking) {
                this._currentButtonScale = { x: DEFAULT_BUTTON_SCALE.CLICKING, y: DEFAULT_BUTTON_SCALE.CLICKING };
            }
        }

        var context = ig.system.context;
        context.save();
        var scale = ig.system.scale;
        var originX = this.pos.x + (this.size.x / 2);
        var originY = this.pos.y + (this.size.y / 2);
        context.translate(originX * scale, originY * scale);
        context.scale(this._currentButtonScale.x, this._currentButtonScale.y);
        context.translate(-originX * scale, -originY * scale);
        this._baseDraw();
        context.restore();
    };
});