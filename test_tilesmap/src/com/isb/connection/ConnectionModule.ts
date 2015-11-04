/**
 * Created by user60 on 28/10/15.
 */

module ConnectionModule{
    export class Connection{
        websocket;

        constructor(websocket){
            this.websocket = websocket;
            this.init();
        }

        init(){
            //add listeners

            this.websocket.cmodule = this;
            this.websocket.onmessage = function(evt) { this.cmodule.onMessage(evt) };
            this.websocket.onerror = function(evt) { this.cmodule.onError(evt) };
        }

        onMessage(evt){
            EventsModule.SignalsManager.getInstance().dispatch("test", tile);
        }

        sendCharacterSelection(msg){
            this.doSendObj({
                name: 'select character',
                param: msg
            });
        }

        sendMove(move, state){
            this.doSendObj({
                name: 'move',
                param: move //TODO: send the correct param (move and state)
            });
        }

        sendSkip(){
            this.doSendObj({
                name: 'move_skip',
                param: null //TODO: send state (maybe)
            });
        }

        doSend(obj){
            console.log("SENT: " + obj);
            this.websocket.send(obj);
        }

        doSendObj(obj){
            this.doSend(JSON.stringify(obj));
        }

        terminate(){
            this.websocket.close();
        }
    }
}