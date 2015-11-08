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
                ConnectionModule.ConnectionSignals.MATCH_FOUND,
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
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.MOVE, this.sendMove.bind(this), this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.FIND_MATCH, this.findMatch, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.PLAYER_READY, this.playerReady, this);
            EventsModule.SignalsManager.getInstance().createBinding(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, this.selectCharacter, this);
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
            console.log(">>>> " + data.event + " WITH PARAMS: " + JSON.stringify(data.param));

            if (this.isInArray(data.event, this.signalsToDispatch))
            {
                if (data.event == ConnectionModule.ConnectionSignals.MOVE) {
                    var moveVO = this.createMoveVO(data.param);
                    MvcModule.Mvc.getInstance().sendNotification(RoundsModule.RoundsCommand.event, moveVO);
                }
                else
                {
                    MvcModule.Mvc.getInstance().sendNotification(data.event, data.param);
                }
            }

                //FAKE MATCHMAKING
                if (data.event == 'welcome') {
                    EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.FIND_MATCH);
                }
                if (data.event == ConnectionModule.ConnectionSignals.MATCH_FOUND) {
                    EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.PLAYER_READY);
                }
                if (data.event == ConnectionModule.ConnectionSignals.START_CHARACTER_SELECTION) {
                    EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, 2);
                }
            }

            onError(evt)
            {
                console.log("Connection error: " + evt.data)
            }

            findMatch(msg)
            {
                this.doSendObj({
                    event: 'find_match',
                    param: msg
                });
            }

            selectCharacter(msg)
            {
                this.doSendObj({
                    event: 'select character',
                    param: msg
                });
            };

            playerReady(msg){
                this.doSendObj({
                    event: ConnectionModule.ConnectionSignals.PLAYER_READY,
                    param: msg
                });
            };

            sendMove(move)
            {
                this.doSendObj({
                    event: ConnectionModule.ConnectionSignals.MOVE,
                    param: move
                });
            };

            skipMove()
            {
                this.doSendObj({
                    event: 'move_skip',
                    param: null
                });
            }

            registerName(msg)
            {
                console.log(this)
                this.doSendObj({
                    event: 'register_name',
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