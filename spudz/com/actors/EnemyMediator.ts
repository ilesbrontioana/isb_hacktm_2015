/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class EnemyMediator extends MvcModule.Mediator
    {
        static NAME:string = "EnemyMediator";

        characterProxy:CharacterModule.CharacterProxy;
        enemyProxy:CharacterModule.EnemyProxy;

        constructor(viewComponent:MvcModule.View){

            super(EnemyMediator.NAME, viewComponent);
        }

        onRegister(){

            this.initListeners();

            this.enemyProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.EnemyProxy.NAME) as CharacterModule.EnemyProxy);
            this.enemyProxy.setCharacterName((MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenModule.SelectionScreenProxy.NAME) as SelectionScreenModule.SelectionScreenProxy).getOpponentSelection());

            var x = 1160;
            var y = 1255;
            (this.viewComponent as CharacterView).createCharacter(this.enemyProxy.getCharacterName(), x, y, false);

            this.enemyProxy.setCharacter((this.viewComponent as EnemyView).graphics);

            this.characterProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterModule.CharacterProxy);

        }


        initListeners()
        {
            this.addListenerToSignal("CharacterDamage", function(damage:number){
                this.enemyProxy.setLife(this.enemyProxy.getLife() - damage);
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.ATTACK_COMPLETE, damage);
            },this);

            this.addListenerToSignal("OpponentActionsComplete", function(){
                this.dispatchSignal(ConnectionModule.ConnectionSignals.OPPONENT_MOVE_COMPLETE);
            },this);
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.UPDATE_CHARACTER,
                CharacterModule.CharacterNotifications.ATTACK_ENEMY,
                ConnectionModule.ConnectionSignals.MOVE
            ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as EnemyView).updateCharacter();
                    break;
                case  CharacterModule.CharacterNotifications.ATTACK_ENEMY:
                    (this.viewComponent as EnemyView).tryDamage(notification.body);
                    break;
                case ConnectionModule.ConnectionSignals.MOVE:
                    (this.viewComponent as EnemyView).characterTurn();

                    //TODO - hardcoded, remove 40, get from grid
                    (this.viewComponent as EnemyView).startMoving(notification.body.destination.x, notification.body.destination.y,
                        40, 40);
                    (this.viewComponent as EnemyView).setCharacterAttackAction(notification.body.ability);

                    break;
            }
        }
    }
}