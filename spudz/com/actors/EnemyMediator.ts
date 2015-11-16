/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class EnemyMediator extends MvcModule.Mediator
    {
        static NAME:string = "EnemyMediator";

        constructor(viewComponent:MvcModule.View){

            super(EnemyMediator.NAME, viewComponent);
        }



        onRegister(){
            (this.viewComponent as EnemyView).createCharacter(
                (MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenModule.SelectionScreenProxy.NAME) as SelectionScreenModule.SelectionScreenProxy).getOpponentSelection());
            this.initListeners();
        }

        initListeners()
        {
            this.addListenerToSignal("CharacterDamage", function(damage:number){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.DAMAGE_COMPLETE, damage);
            },this);
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.UPDATE_CHARACTER,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterModule.CharacterNotifications.TRY_DAMAGE_WITH_RAY,
                ConnectionModule.ConnectionSignals.MOVE
            ];
        }

        handleNotification(notification:MvcModule.INotification) {
            MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.character = (this.viewComponent as EnemyView).graphics;

            switch (notification.name){
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as EnemyView).updateCharacter();
                    break;
                case CharacterModule.CharacterNotifications.TAKE_DAMAGE:
                    (this.viewComponent as EnemyView).animateTakeDamage(notification.body);
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.life);
                    break
                case CharacterModule.CharacterNotifications.DRAIN_ENERGY:
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.energy);
                    break
                case  CharacterModule.CharacterNotifications.TRY_DAMAGE_WITH_RAY:
                    (this.viewComponent as EnemyView).tryDamage(notification.body);
                    break;
                case ConnectionModule.ConnectionSignals.MOVE:
                    break;
            }
        }
    }
}