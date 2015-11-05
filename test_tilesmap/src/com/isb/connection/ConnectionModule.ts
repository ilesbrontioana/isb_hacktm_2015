/**
 * Created by user60 on 28/10/15.
 */
/// <reference path="../events/SignalsManager.ts" />

module ConnectionModule{
    export class Connection{
        websocket;
        messagesToDispatch;
        const FIND_MATCH: string = "find_match";
        const SELECT_CHARACTER: string = "select_character";
        const MOVE: string = "move";
        const MOVE_SKIP: string = "move_skip";


        constructor(websocket){
            this.messagesToDispatch = [
                "opponent_character",
                "move",
                "start_match",
                "reconciliation",
                "win",
                "opponent_disconnected",
                "move_time_expired",
                "opponent_skip",
                "error"];
            this.websocket = websocket;
            this.init();
        }

        init(){
            //register signals
            EventsModule.SignalsManager.getInstance().createBinding(this.FIND_MATCH, this.findMatch, this);
            EventsModule.SignalsManager.getInstance().createBinding(this.SELECT_CHARACTER, this.selectCharacter, this);
            EventsModule.SignalsManager.getInstance().createBinding(this.MOVE, this.sendMove, this);
            EventsModule.SignalsManager.getInstance().createBinding(this.MOVE_SKIP, this.skipMove, this);

            this.websocket.cmodule = this;
            this.websocket.onmessage = function(evt) { this.cmodule.onMessage(evt) };
            this.websocket.onerror = function(evt) { this.cmodule.onError(evt) };
        }

        onMessage(evt){
            var data = JSON.parse(evt.data);
            console.log("FROM SERVER: "+data.name+" WITH PARAMS: "+data.param);

            //TODO: handle the issue with 'move' coming from both internal and server
            if(this.isInArray(data.name, this.messagesToDispatch))
                EventsModule.SignalsManager.getInstance().dispatch(data.name, data.param);
        }

        onError(evt){
            console.log("Connection error: "+evt.data)
        }

        findMatch(msg){
            this.doSendObj({
                name: 'find_match',
                param: msg
            });
        }

        selectCharacter(msg){
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

        skipMove(){
            this.doSendObj({
                name: 'move_skip',
                param: null //TODO: send state (maybe)
            });
        }

        doSend(obj){
            console.log("SENT TO SERVER: " + obj);
            this.websocket.send(obj);
        }

        doSendObj(obj){
            this.doSend(JSON.stringify(obj));
        }

        isInArray(value, array) {
            var count=array.length;
            for(var i=0;i<count;i++)
            {
                if(array[i]===value){return true;}
            }
            return false;
        }

    }
}