ig.module('templates.utils.music-sound')
    .requires(
        'templates.utils.ui',
        'templates.entities.button.entity-button-simple'
    )
    .defines(function () {
        EntityButtonMusicSound = EntityButtonImage.extend({
            image: null,
            isOn: false,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.setupAnimationSheet(this.image, 1, 2);
                this.addAnim("on", 1, [0], true);
                this.addAnim("off", 1, [1], true);
                this.currentAnim = this.anims.on;
            },
            update: function () {
                if (this.isOn) {
                    this.currentAnim = this.anims.on;
                } else {
                    this.currentAnim = this.anims.off;
                }
                this.parent();
            },
            switchState: function (isOn) {
                if (isOn === undefined) {
                    this.isOn = !this.isOn;
                } else {
                    this.isOn = isOn;
                }

                if (this.isOn) {
                    this.currentAnim = this.anims.on;
                } else {
                    this.currentAnim = this.anims.off;
                }
            },
            onClickCallback: function () {
                this.switchState();
                if (ig.check.function(this.onStateChange)) this.onStateChange(this.isOn);
            }
        });
        EntityMusicSound = EntityController.extend({
            iconImage: null,
            buttonImage: null,
            onStateChange: null,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this._icon = this.spawnEntity(EntityImageSimple, OUT_SIDE, OUT_SIDE, {
                    image: this.iconImage,
                    zIndex: this.zIndex
                });
                this._button = this.spawnEntity(EntityButtonMusicSound, OUT_SIDE, OUT_SIDE, {
                    image: this.buttonImage,
                    zIndex: this.zIndex,
                    onStateChange: this.onStateChange
                });
            },
            _updatePosition: function () {
                var center = {
                    x: this.pos.x + this.size.x * 0.5,
                    y: this.pos.y + this.size.y * 0.5
                };
                var totalSizeX = this._icon.size.x + this._button.size.x;
                // if (this._icon) this._icon.pos = {
                //     x: center.x - this._icon.size.x * 0.5,
                //     y: center.y - this._icon.size.y * 0.5
                // };
                // if (this._button) this._button.pos = {
                //     x: center.x - this._button.size.x * 0.5 + 50,
                //     y: center.y - this._button.size.y * 0.5
                // };

                if (this._icon) this._icon.pos = {
                    x: center.x - totalSizeX * 0.5,
                    y: center.y - this._icon.size.y * 0.5
                };
                if (this._button) this._button.pos = {
                    x: center.x + totalSizeX * 0.5 - this._button.size.x,
                    y: center.y - this._button.size.y * 0.5
                };
            },
            _updateButtonState: function (isOn) {
                if (this._button) this._button.switchState(isOn);
            },
            update: function () {
                this._updatePosition();
                this.parent();
            },
        });
    });

