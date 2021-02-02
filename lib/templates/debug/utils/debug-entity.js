ig.module('templates.debug.utils.debug-entity')
    .requires(
        'impact.entity'
    )
    .defines(function () {
        ig.Entity.inject({
            debugColor: 'rgba(255,255,255,0.25)',
            draw: function () {
                this.parent();
                if (_DEBUG.ENTITY) {
                    var context = ig.system.context;
                    context.save();
                    context.restore();
                }
            }
        });
        ig.Entity.prototype.log = window.console["log"].bind(window.console, this.className + ": ");
    });
