/**
 * Created by user60 on 28/10/15.
 */

module ConnectionModule{
    export class Connection{

        game;
        websocket;

        constructor(game){
            this.game=game;
        }

        init(wsURL){
            websocket = new WebSocket(wsURL);
            websocket.onopen = function(evt) { this.onOpen};
            websocket.onclose = function(evt) { this.onClose(evt) };
            websocket.onmessage = function(evt) { this.onMessage };
            websocket.onerror = function(evt) { this.onError(evt) };
        }

        onOpen(evt){
            console.log("Connected to server");
            doSendObj({
                name:'register_name',
                param:'htmlClientName'});
        }

        onMessage(evt){
            console.log("Received from server: "+evt.data);
        }

        doSendObj(obj){
            doSend(JSON.stringify(obj));
        }

        terminate(){
            websocket.close();
        }
    }
}