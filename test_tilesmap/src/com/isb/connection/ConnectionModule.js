/**
 * Created by user60 on 28/10/15.
 */
var ConnectionModule;
(function (ConnectionModule) {
    var Connection = (function () {
        function Connection(grid, websocket) {
            this.grid = grid;
            this.websocket = websocket;
            this.signal = new Phaser.Signal;
            this.init();
        }
        Connection.prototype.init = function () {
            //add listeners
            //LISTENER FOR TESTING PURPOSES ONLY!
            /*this.grid.signal.add(
                function()
                {
                    console.log("Connection module got signal");
                    this.sendSkip();
                }
            )*/
            this.websocket.onclose = function (evt) {
                this.onClose(evt);
            };
            this.websocket.onmessage = function (evt) {
                this.onMessage(evt);
            };
            this.websocket.onerror = function (evt) {
                this.onError(evt);
            };
        };
        Connection.prototype.onMessage = function (evt) {
            console.log("Received from server: " + evt.data);
        };
        Connection.prototype.sendCharacterSelection = function (msg) {
            doSendObj({
                name: 'select character',
                param: msg
            });
        };
        Connection.prototype.sendMove = function (move, state) {
            doSendObj({
                name: 'move',
                param: move //TODO: send the correct param (move and state)
            });
        };
        Connection.prototype.sendSkip = function () {
            doSendObj({
                name: 'move_skip',
                param: null //TODO: send state (maybe)
            });
        };
        Connection.prototype.doSend = function (obj) {
            console.log("SENT: " + message);
            websocket.send(message);
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