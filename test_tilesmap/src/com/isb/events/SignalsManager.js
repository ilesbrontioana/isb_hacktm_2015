/**
 * Created by adm on 04.11.15.
 */
var EventsModule;
(function (EventsModule) {
    var SignalsManager = (function () {
        function SignalsManager() {
            this.signals = {};
            if (SignalsManager._instance) {
                throw new Error("Te Dreq: Instantiation failed: Use SignalsManager.getInstance()");
            }
            SignalsManager._instance = this;
        }
        SignalsManager.getInstance = function () {
            return SignalsManager._instance;
        };
        SignalsManager.prototype.createBinding = function (name, listener, listenerContext, priority, args) {
            if (!this.signals[name]) {
                var custBind = new CustomBinding();
                this.signals[name] = custBind;
            }
            var signalBinding = new Phaser.SignalBinding(this.signals[name].signal, listener, false, listenerContext, priority, args);
            this.signals[name].bindings.push(signalBinding);
            this.signals[name].context = listenerContext;
        };
        SignalsManager.prototype.dispatch = function (name, args) {
            var bindings = this.signals[name].bindings;
            for (var i = 0; i < bindings.length; i++) {
                bindings[i].getListener().call(this.signals[name].context, args);
            }
        };
        SignalsManager._instance = new SignalsManager();
        return SignalsManager;
    })();
    EventsModule.SignalsManager = SignalsManager;
    var CustomBinding = (function () {
        function CustomBinding() {
            this.signal = new Phaser.Signal();
            this.bindings = new Array();
        }
        return CustomBinding;
    })();
    EventsModule.CustomBinding = CustomBinding;
})(EventsModule || (EventsModule = {}));
//# sourceMappingURL=SignalsManager.js.map