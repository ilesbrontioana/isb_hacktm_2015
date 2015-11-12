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

            this.addListenerToSignal("move", function(){},this);
            this.addListenerToSignal("CharacterDamage", function(damage:number){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.DAMAGE_COMPLETE, damage);
            },this);
            this.addListenerToSignal("CharacterPosition", function(body:any){
            }, this);
        }



        onRegister(){
            (this.viewComponent as EnemyView).createCharacter(
                (MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenModule.SelectionScreenProxy.NAME) as SelectionScreenProxy).getOpponentSelection());
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterModule.CharacterNotifications.TRY_DAMAGE,
                CharacterModule.CharacterNotifications.TRY_DAMAGE_WITH_RAY,
            ];
        }

        handleNotification(notification:MvcModule.INotification) {
            MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.character = (this.viewComponent as EnemyView).graphics;

            switch (notification.name){
                case CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION:
                    (this.viewComponent as EnemyView).checkCollision(notification.body as Array<Phaser.TilemapLayer>);
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
            }
        }
    }
}