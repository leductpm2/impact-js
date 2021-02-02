ig.module(
    'templates.debug.custom.custom-debug'
).requires(
    'templates.debug.utils.debug-controller'
    // ,'plugins.box2d.debug'
).defines(function () {
    EntityDebugController.inject({
        _initControl: function () {
            this.parent();    
            this.addNewControl("NUMPAD_0", function () {               
            }.bind(this), "CRASH");           
        },        
    });
});
