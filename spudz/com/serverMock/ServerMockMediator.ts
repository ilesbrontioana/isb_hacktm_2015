/**
 * Created by ioanailes on 12/11/15.
 */
module ServerMockModule
{
    export class ServerMockMediator extends MvcModule.Mediator
    {
        static NAME:string = "ServerMockMediator";

        moveVO:ConnectionModule.MoveVO;

        characterProxy:CharacterModule.CharacterProxy;
        enemyProxy:CharacterModule.EnemyProxy;

        constructor(viewComponent:MvcModule.IView)
        {
            super(ServerMockMediator.NAME, viewComponent);
        }

        onRegister()
        {
            this.moveVO = new ConnectionModule.MoveVO();

            this.addListenerToSignal(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, function (selection:string) {

                var randomTime:number = Math.random() * 5;
                GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * randomTime, function()
                {
                    var opponentSelection:string = selection;
                    var otherSelections:Array<string> = this.getOtherSelections(selection);

                    var opponentSelectionNo = Math.random() * 2;
                    if(opponentSelectionNo < 1)
                    {
                        opponentSelection = otherSelections[0];
                    }
                    else if(opponentSelectionNo < 2)
                    {
                        opponentSelection = otherSelections[1];
                    }
                    else
                    {
                        opponentSelection = "marine";
                    }
                    console.log("server : opponent selection");
                    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.OPPONENT_CHARACTER, opponentSelection);
                }.bind(this), this);
            }, this);

            this.addListenerToSignal(ConnectionModule.ConnectionSignals.MOVE, function (param:any) {
                    console.log("server : end turn");
                    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.END_TURN);
                    this.opponentMove();
            }, this);

            this.addListenerToSignal(ConnectionModule.ConnectionSignals.OPPONENT_MOVE_COMPLETE, function(param:any)
            {
                console.log("server : your turn");
                MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.YOUR_TURN);
            }, this)
        }

        listNotificationInterests():Array<string>{
            return [RoundsModule.RoundsNotifications.FIGHT];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {
                case RoundsModule.RoundsNotifications.FIGHT:
                    this.characterProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterModule.CharacterProxy);
                    this.enemyProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.EnemyProxy.NAME) as CharacterModule.EnemyProxy);

                    //var turn:number = Math.random() * 2;
                    //if(turn < 1)
                    //{
                    //    this.opponentMove();
                    //}
                    //else
                    //{
                        console.log("server : your turn");
                        MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.YOUR_TURN);
                    //}

                    break;

            }
        }

        opponentMove()
        {
                console.log("server : opponent attack");
                MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.MOVE, this.getAttackAction());
        }

        getAttackAction():ConnectionModule.MoveVO{

            var abilityNo = Math.random() * 4;
            var ability:string = "";
            if(abilityNo < 1)
            {
                ability = CharacterModule.CharacterActionType.DEFENCE;
            }
            else if(abilityNo < 2)
            {
                ability = CharacterModule.CharacterActionType.MELEE;
            }
            else if(abilityNo < 3)
            {
                ability = CharacterModule.CharacterActionType.RANGE;
            }
            else
            {
                ability = CharacterModule.CharacterActionType.SKIP;
            }
            this.moveVO.ability = ability;

            var xOffset:number;
            var yOffset:number;
            var randomX = Math.floor(Math.random() * 12);

            if(randomX < 6)
            {
                xOffset = - 40 * randomX;
            }
            else
            {
                xOffset = 40 * (randomX % 6);
            }

            var randomY = Math.floor(Math.random() * 6);
            yOffset = - 40 * randomY;

            var newEnemyPosition:Phaser.Point = new Phaser.Point(this.enemyProxy.getCharacter().position.x + xOffset,
                this.enemyProxy.getCharacter().position.y + yOffset);
            this.moveVO.destination = newEnemyPosition;
            this.moveVO.player_pos = newEnemyPosition;

            this.moveVO.player_energy = this.enemyProxy.getEnergy() - 10;
            this.moveVO.player_health = this.enemyProxy.getLife();
            this.moveVO.opponent_energy = this.characterProxy.getEnergy();
            this.moveVO.opponent_health = this.characterProxy.getLife();
            this.moveVO.opponent_pos = this.characterProxy.getCharacter().position;

            return this.moveVO;
        }

        getOtherSelections(selection:string):Array<string>
        {
            var all:Array<string> = ["marine", "bacon", "pirate"];
            var index = all.indexOf(selection);
            all.splice(index, 1);
            return all;
        }
    }
}