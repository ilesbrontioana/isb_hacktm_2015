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

            (this.viewComponent as CharacterView).createCharacter(this.enemyProxy.getCharacterName());

            this.enemyProxy.setCharacter((this.viewComponent as EnemyView).graphics);

            this.characterProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterModule.CharacterProxy);

        }


        initListeners()
        {
            this.addListenerToSignal("CharacterDamage", function(damage:number){
                this.enemyProxy.setLife(this.enemyProxy.getLife() - damage);
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.ATTACK_COMPLETE, damage);
            },this);

            this.addListenerToSignal("OpponentInfoToServer", function(){
                this.dispatchSignal(ConnectionModule.ConnectionSignals.OPPONENT_MOVE);
            },this);
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.UPDATE_CHARACTER,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterModule.CharacterNotifications.ATTACK_ENEMY,
                ConnectionModule.ConnectionSignals.MOVE
            ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as EnemyView).updateCharacter();
                    break;
                case CharacterModule.CharacterNotifications.TAKE_DAMAGE:
                    (this.viewComponent as EnemyView).animateTakeDamage(notification.body);
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.life);
                    break;
                case CharacterModule.CharacterNotifications.DRAIN_ENERGY:
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.energy);
                    break;
                case  CharacterModule.CharacterNotifications.ATTACK_ENEMY:
                    (this.viewComponent as EnemyView).tryDamage(notification.body);
                    break;
                case ConnectionModule.ConnectionSignals.MOVE:
                    if(notification.body.ability == "")
                    {
                        (this.viewComponent as EnemyView).characterTurn();
                        //TODO - hardcoded, remove 40, get from grid
                        (this.viewComponent as EnemyView).startMoving(notification.body.destination.x, notification.body.destination.y,
                            40, 40);
                    }
                    else
                    {
                        (this.viewComponent as EnemyView).setCharacterAttackAction(notification.body.ability);
                    }
                    break;
            }
        }
    }
}