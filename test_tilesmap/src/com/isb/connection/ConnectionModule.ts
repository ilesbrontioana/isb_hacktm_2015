/**
 * Created by user60 on 28/10/15.
 */

module ConnectionModule{
    export class Connection{

        grid;
        websocket;
        signal:Phaser.Signal;

        constructor(grid, websocket){
            this.grid = grid;
            this.websocket = websocket;
            this.signal = new Phaser.Signal;
            this.init();
        }

        init(){
            //add listeners

            //LISTENER FOR TESTING PURPOSES ONLY!
            /*this.grid.signal.add(
                function()
                {
                    console.log("Connection module got signal");
                    this.sendSkip();
                }
            )*/

            this.websocket.onclose = function(evt) { this.onClose(evt) };
            this.websocket.onmessage = function(evt) { this.onMessage(evt) };
            this.websocket.onerror = function(evt) { this.onError(evt) };
        }

        onMessage(evt){
            console.log("Received from server: "+evt.data);
        }

        sendCharacterSelection(msg){
            doSendObj({
                name: 'select character',
                param: msg
            });
        }

        sendMove(move, state){
            doSendObj({
                name: 'move',
                param: move //TODO: send the correct param (move and state)
            });
        }

        sendSkip(){
            doSendObj({
                name: 'move_skip',
                param: null //TODO: send state (maybe)
            });
        }

        doSend(obj){
            console.log("SENT: " + message);
            websocket.send(message);
        }

        doSendObj(obj){
            doSend(JSON.stringify(obj));
        }

        terminate(){
            websocket.close();
        }
    }
}