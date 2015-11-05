/**
 * Created by user60 on 28/10/15.
 */
/// <reference path="../events/SignalsManager.ts" />
var ConnectionModule;
(function (ConnectionModule) {
    var Connection = (function () {
        function Connection(websocket) {
            this.messagesToDispatch = [
                "opponent_character",
                "move",
                "start_match",
                "reconciliation",
                "win",
                "opponent_disconnected",
                "move_time_expired",
                "opponent_skip",
                "error"
            ];
            this.websocket = websocket;
            this.init();
        }
        Connection.prototype.init = function () {
            //register signals
            EventsModule.SignalsManager.getInstance().createBinding("find_match", this.findMatch, this);
            EventsModule.SignalsManager.getInstance().createBinding("select_character", this.selectCharacter, this);
            EventsModule.SignalsManager.getInstance().createBinding("move", this.sendMove, this);
            EventsModule.SignalsManager.getInstance().createBinding("move_skip", this.skipMove, this);
            this.websocket.cmodule = this;
            this.websocket.onmessage = function (evt) {
                this.cmodule.onMessage(evt);
            };
            this.websocket.onerror = function (evt) {
                this.cmodule.onError(evt);
            };
        };
        Connection.prototype.onMessage = function (evt) {
            var data = JSON.parse(evt.data);
            console.log("FROM SERVER: " + data.name + " WITH PARAMS: " + data.param);
            if (this.isInArray(data.name, this.messagesToDispatch))
                EventsModule.SignalsManager.getInstance().dispatch(data.name, data.param);
        };
        Connection.prototype.onError = function (evt) {
            console.log("Connection error: " + evt.data);
        };
        Connection.prototype.findMatch = function (msg) {
            this.doSendObj({
                name: 'find_match',
                param: msg
            });
        };
        Connection.prototype.selectCharacter = function (msg) {
            this.doSendObj({
                name: 'select character',
                param: msg
            });
        };
        Connection.prototype.sendMove = function (move, state) {
            this.doSendObj({
                name: 'move',
                param: move //TODO: send the correct param (move and state)
            });
        };
        Connection.prototype.skipMove = function () {
            this.doSendObj({
                name: 'move_skip',
                param: null //TODO: send state (maybe)
            });
        };
        Connection.prototype.doSend = function (obj) {
            console.log("SENT: " + obj);
            this.websocket.send(obj);
        };
        Connection.prototype.doSendObj = function (obj) {
            this.doSend(JSON.stringify(obj));
        };
        Connection.prototype.isInArray = function (value, array) {
            var count = array.length;
            for (var i = 0; i < count; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
            return false;
        };
        return Connection;
    })();
    ConnectionModule.Connection = Connection;
})(ConnectionModule || (ConnectionModule = {}));
//# sourceMappingURL=ConnectionModule.js.map