/**
 * Created by user60 on 28/10/15.
 */

module ConnectionModule{
    export class ConnectionProxy extends MvcModule.Proxy{
        websocket;
        signalsToDispatch;

        constructor(websocket){
            this.signalsToDispatch = [
                ConnectionModule.ConnectionSignals.OPPONENT_CHARACTER,
                ConnectionModule.ConnectionSignals.START_MATCH,
                ConnectionModule.ConnectionSignals.RECONCILIATION,
                ConnectionModule.ConnectionSignals.WIN,
                ConnectionModule.ConnectionSignals.OPPONENT_DISCONNECTED,
                ConnectionModule.ConnectionSignals.MOVE_TIME_EXPIRED,
                ConnectionModule.ConnectionSignals.OPPONENT_SKIP,
                ConnectionModule.ConnectionSignals.ERROR];
            this.websocket = websocket;
            this.init();
        }

        init(){
            //register signals
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.FIND_MATCH, this.findMatch, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, this.selectCharacter, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.MOVE, this.sendMove, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.MOVE_SKIP, this.skipMove, this);

            this.websocket.cmodule = this;
            this.websocket.onmessage = function(evt) { this.cmodule.onMessage(evt) };
            this.websocket.onerror = function(evt) { this.cmodule.onError(evt) };
        }

        onMessage(evt){
            var data = JSON.parse(evt.data);
            console.log("FROM SERVER: "+data.name+" WITH PARAMS: "+data.param);

            //TODO: handle the issue with 'move' coming from both internal and server
            if(this.isInArray(data.name, this.signalsToDispatch))
                this.sendNotification(data.name, data.param);
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
                param: move
            });
        }

        skipMove(){
            this.doSendObj({
                name: 'move_skip',
                param: null
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