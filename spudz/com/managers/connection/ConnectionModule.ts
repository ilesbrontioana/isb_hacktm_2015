/**
 * Created by user60 on 28/10/15.
 */

module ConnectionModule {
    export class ConnectionProxy extends MvcModule.Proxy {
        websocket;
        signalsToDispatch;

        constructor(websocket) {
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
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, this.selectCharacter, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.MOVE, this.sendMove, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.MOVE_SKIP, this.skipMove, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.REGISTER_NAME, this.registerName, this);

            this.websocket.cmodule = this;
            this.websocket.onmessage = function (evt) {
                this.cmodule.onMessage(evt)
            };
            this.websocket.onerror = function (evt) {
                this.cmodule.onError(evt)
            };
        }

        onMessage(evt) {
            var data = JSON.parse(evt.data);
            console.log(">>>> " + data.name + " WITH PARAMS: " + JSON.stringify(data.param));

            if (this.isInArray(data.name, this.signalsToDispatch)) {
                if (data.name == ConnectionModule.ConnectionSignals.MOVE) {
                    var moveVO = this.createMoveVO(data.param);
                    MvcModule.Mvc.getInstance().sendNotification(RoundsModule.RoundsCommand.NAME, moveVO);
                }
            }

                //ask for match making,
                if (data.name == 'welcome') {
                    EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.FIND_MATCH);
                    EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.REGISTER_NAME, "gameclient");
                }
            }

            onError(evt)
            {
                console.log("Connection error: " + evt.data)
            }

            findMatch(msg)
            {
                this.doSendObj({
                    name: 'find_match',
                    param: msg
                });
            }

            selectCharacter(msg)
            {
                this.doSendObj({
                    name: 'select character',
                    param: msg
                });
            }

            sendMove(move)
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

            registerName(msg)
            {
                this.doSendObj({
                    name: 'register_name',
                    param: msg
                });
            }

            createMoveVO(data):ConnectionModule.MoveVO
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

            doSend(obj)
            {
                console.log("<<<< " + obj);
                this.websocket.send(obj);
            }

            doSendObj(obj)
            {
                this.doSend(JSON.stringify(obj));
            }

            isInArray(value, array)
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