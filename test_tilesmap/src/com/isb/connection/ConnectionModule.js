/**
 * Created by user60 on 28/10/15.
 */
var ConnectionModule;
(function (ConnectionModule) {
    var Connection = (function () {
        function Connection(game) {
            this.game = game;
        }
        Connection.prototype.init = function (wsURL) {
            websocket = new WebSocket(wsURL);
            websocket.onopen = function (evt) {
                this.onOpen;
            };
            websocket.onclose = function (evt) {
                this.onClose(evt);
            };
            websocket.onmessage = function (evt) {
                this.onMessage;
            };
            websocket.onerror = function (evt) {
                this.onError(evt);
            };
        };
        Connection.prototype.onOpen = function (evt) {
            console.log("Connected to server");
            doSendObj({
                name: 'register_name',
                param: 'htmlClientName'
            });
        };
        Connection.prototype.onMessage = function (evt) {
            console.log("Received from server: " + evt.data);
        };
        Connection.prototype.doSendObj = function (obj) {
            doSend(JSON.stringify(obj));
        };
        Connection.prototype.terminate = function () {
            websocket.close();
        };
        return Connection;
    })();
    ConnectionModule.Connection = Connection;
})(ConnectionModule || (ConnectionModule = {}));
//# sourceMappingURL=ConnectionModule.js.map