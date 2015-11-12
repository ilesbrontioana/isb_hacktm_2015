/**
 * Created by user60 on 28/10/15.
 */

module ConnectionModule {
    export class ConnectionProxy extends MvcModule.Proxy {

        static NAME:string = "ConnectionProxy";

        websocket:WebSocket;
        signalsToDispatch:Array<string>;

        constructor(websocket:WebSocket) {
            super(ConnectionProxy.NAME);
            this.signalsToDispatch = [
                ConnectionModule.ConnectionSignals.OPPONENT_CHARACTER,
                ConnectionModule.ConnectionSignals.START_MATCH,
                ConnectionModule.ConnectionSignals.MOVE,
                ConnectionModule.ConnectionSignals.RECONCILIATION,
                ConnectionModule.ConnectionSignals.WIN,
                ConnectionModule.ConnectionSignals.OPPONENT_DISCONNECTED,
                ConnectionModule.ConnectionSignals.MOVE_TIME_EXPIRED,
                ConnectionModule.ConnectionSignals.OPPONENT_SKIP,
                ConnectionModule.ConnectionSignals.ERROR];
            this.websocket = websocket;
            this.init();
        }

        init() {
            //register signals
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.FIND_MATCH, this.findMatch, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.PLAYER_READY, this.playerReady, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, this.selectCharacter, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.MOVE, this.sendMove, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.MOVE_SKIP, this.skipMove, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.REGISTER_NAME, this.registerName, this);

            this.websocket.cmodule = this;
            this.websocket.onmessage = function (evt:any) {
                this.cmodule.onMessage(evt)
            };
            this.websocket.onerror = function (evt:any) {
                this.cmodule.onError(evt)
            };
        }

        onMessage(evt:any) {
            var data = JSON.parse(evt.data);
            console.log(">>>> " + data.name + " WITH PARAMS: " + JSON.stringify(data.param));

            if (this.isInArray(data.name, this.signalsToDispatch)) {
                if (data.name == ConnectionModule.ConnectionSignals.MOVE) {
                    var moveVO = this.createMoveVO(data.param);
                    MvcModule.Mvc.getInstance().sendNotification(RoundsModule.RoundsCommand.NAME, moveVO);
                }
            }
            else {
                MvcModule.Mvc.getInstance().sendNotification(data.name, data.param);
            }

            //ask for match making,
            if (data.name == 'welcome') {
                EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.REGISTER_NAME, "gameclient" + Math.random());
                EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.FIND_MATCH);
            }
        }

        onError(evt:any)
        {
            //TODO - show error to client
            console.log("Connection error: " + evt.data)
        }

        findMatch(msg:any)
        {
            this.doSendObj({
                name: 'find_match',
                param: msg
            });
        }

        playerReady(msg:any)
        {
            this.doSendObj({
                name: 'player_ready',
                param: msg
            });
        }

        selectCharacter(msg:any)
        {
            this.doSendObj({
                name: 'select character',
                param: msg
            });
        }

        sendMove(move:any)
        {
            this.doSendObj({
                name: 'move',
                param: move
            });
            console.log("SEND TO SERVER MOVE "+move);
        }

        skipMove()
        {
            this.doSendObj({
                name: 'move_skip',
                param: null
            });
        }

        registerName(msg:any)
        {
            this.doSendObj({
                name: 'register_name',
                param: msg
            });
        }

        createMoveVO(data:any):ConnectionModule.MoveVO
        {
            var moveVO:ConnectionModule.MoveVO = new MoveVO();
            moveVO.destination = JSON.parse(data.destination);
            moveVO.ability = JSON.parse(data.ability);
            moveVO.player_pos = JSON.parse(data.player_pos);
            moveVO.opponent_pos = JSON.parse(data.opponent_pos);
            moveVO.player_health = JSON.parse(data.player_health);
            moveVO.opponent_health = JSON.parse(data.opponent_health);
            moveVO.player_energy = JSON.parse(data.player_energy);
            moveVO.opponent_energy = JSON.parse(data.opponent_energy);

            return moveVO;
        }

        doSend(obj:any)
        {
            console.log("<<<< " + obj);
            this.websocket.send(obj);
        }

        doSendObj(obj:any)
        {
            this.doSend(JSON.stringify(obj));
        }

        isInArray(value:string, array:Array<string>)
        {
            var count = array.length;
            for (var i = 0; i < count; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
            return false;
        }
    }
}