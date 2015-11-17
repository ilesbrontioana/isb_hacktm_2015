/**
 * Created by ioanailes on 12/11/15.
 */
module ServerMockModule
{
    export class ServerMockMediator extends MvcModule.Mediator
    {
        static NAME:string = "ServerMockMediator";

        moveVO:ConnectionModule.MoveVO;

        noOfActions = 0;

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
                this.noOfActions++;
                if(this.noOfActions == 2)
                {
                    console.log("server : end turn");
                    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.END_TURN);
                    this.noOfActions = 0;
                    this.opponentMove();
                }
            }, this);

            this.addListenerToSignal(ConnectionModule.ConnectionSignals.OPPONENT_MOVE, function(param:any)
            {
                this.opponentMove();
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

                    this.noOfActions = 0;
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
            this.noOfActions++;
            if(this.noOfActions == 1)
            {
                console.log("server : opponent move");
                MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.MOVE, this.getMoveAction());
            }
            else if(this.noOfActions == 2)
            {
                console.log("server : opponent attack");
                MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.MOVE, this.getAttackAction());
            }
            else if(this.noOfActions == 3)
            {
                console.log("server : your turn");
                this.noOfActions = 0;
                MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.YOUR_TURN);
            }

        }

        getMoveAction():ConnectionModule.MoveVO{

            this.moveVO.ability = "";

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

            this.moveVO.player_energy = this.enemyProxy.getEnergy() - 5;
            this.moveVO.player_health = this.enemyProxy.getLife();
            this.moveVO.opponent_energy = this.characterProxy.getEnergy();
            this.moveVO.opponent_health = this.characterProxy.getLife();
            this.moveVO.opponent_pos = this.characterProxy.getCharacter().position;

            return this.moveVO;
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

            this.moveVO.destination = this.enemyProxy.getCharacter().position;
            this.moveVO.player_pos = this.enemyProxy.getCharacter().position;

            this.moveVO.player_energy = this.enemyProxy.getEnergy() - 5;
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