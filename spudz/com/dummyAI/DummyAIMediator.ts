/**
 * Created by ioanailes on 12/11/15.
 */
module DummyAIModule
{
    import P2 = Phaser.Physics.P2;
    export class DummyAIMediator extends MvcModule.Mediator
    {
        static NAME:string = "DummyAIMediator";

        moveVO:ConnectionModule.MoveVO;

        characterProxy:CharacterModule.CharacterProxy;
        enemyProxy:CharacterModule.EnemyProxy;

        constructor(viewComponent:MvcModule.IView)
        {
            super(DummyAIMediator.NAME, viewComponent);
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
                    console.log("dummy ai : opponent selection");
                    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.OPPONENT_CHARACTER, opponentSelection);
                }.bind(this), this);
            }, this);

            this.addListenerToSignal(ConnectionModule.ConnectionSignals.MOVE, function (param:any) {
                    console.log("dummy ai : end turn");
                    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.END_TURN);
                    this.opponentMove();
            }, this);

            this.addListenerToSignal(ConnectionModule.ConnectionSignals.OPPONENT_MOVE_COMPLETE, function(param:any)
            {
                console.log("dummy ai : your turn");
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
                        console.log("dummy ai : your turn");
                        MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.YOUR_TURN);
                    //}

                    break;

            }
        }

        opponentMove()
        {
                console.log("dummy ai : opponent attack");
                MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.MOVE, this.getAttackAction());
        }

        getAttackAction():ConnectionModule.MoveVO{


            this.moveVO.ability = this.getAbility();

            var newEnemyPosition = this.getNewEnemyPosition();

            this.moveVO.destination = newEnemyPosition;
            this.moveVO.player_pos = newEnemyPosition;

            this.moveVO.player_energy = this.enemyProxy.getEnergy() - 10;
            this.moveVO.player_health = this.enemyProxy.getLife();

            this.moveVO.opponent_energy = this.characterProxy.getEnergy();
            this.getLife();
            this.moveVO.opponent_pos = this.characterProxy.getCharacter().position;

            return this.moveVO;
        }

        getAbility():string
        {
            var abilityNo = Math.random() * 4;
            var ability:string = "";
            if(abilityNo < 1.25)
            {
                ability = CharacterModule.CharacterActionType.DEFENCE;
            }
            else if(abilityNo < 2.5)
            {
                ability = CharacterModule.CharacterActionType.MELEE;
            }
            else if(abilityNo < 3.75)
            {
                ability = CharacterModule.CharacterActionType.RANGE;
            }
            else
            {
                ability = CharacterModule.CharacterActionType.SKIP;
            }
            console.log("dummy ai: ability: " + ability);
            return ability;
        }

        getNewEnemyPosition():Phaser.Point
        {
            var xOffset:number;
            var yOffset:number;
            var randomX = Math.floor(Math.random() * 12);

            if(randomX < 6)
            {
                xOffset = - GridModule.GridView.tileWidth * randomX;
            }
            else
            {
                xOffset = GridModule.GridView.tileWidth * (randomX % 6);
            }

            var randomY = Math.floor(Math.random() * 6);
            yOffset = - GridModule.GridView.tileWidth * randomY;

            var newEnemyPosition:Phaser.Point = new Phaser.Point(this.enemyProxy.getCharacter().position.x + xOffset,
                this.enemyProxy.getCharacter().position.y + yOffset);

            return newEnemyPosition;
        }

        getLife()
        {
            this.moveVO.opponent_health = this.characterProxy.getLife();
            if(this.characterProxy.getAbility() != CharacterModule.CharacterActionType.DEFENCE &&
                (this.moveVO.ability == CharacterModule.CharacterActionType.MELEE ||
                    this.moveVO.ability == CharacterModule.CharacterActionType.RANGE)) {
                this.addDamageForOpponent();
            }
        }

        addDamageForOpponent()
        {
            var distance = GraphicsModule.GraphicsManager.getInstance().game.physics.arcade.distanceBetween(
                this.characterProxy.getCharacter(), this.enemyProxy.getCharacter());
            if(this.moveVO.ability == CharacterModule.CharacterActionType.MELEE &&
                distance <= CharacterModule.ActionRayView.MELEE_RAY * GridModule.GridView.tileWidth - this.enemyProxy.getCharacter().width/2)
            {
                this.moveVO.opponent_health = this.characterProxy.getLife() - 20;
                console.log("dummy ai: damage 10");
            }
            else if(  this.moveVO.ability == CharacterModule.CharacterActionType.RANGE &&
                distance <= CharacterModule.ActionRayView.RANGE_RAY * GridModule.GridView.tileWidth - this.enemyProxy.getCharacter().width/2)
            {
                this.moveVO.opponent_health = this.characterProxy.getLife() - 10;
                console.log("dummy ai: damage 5");
            }

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