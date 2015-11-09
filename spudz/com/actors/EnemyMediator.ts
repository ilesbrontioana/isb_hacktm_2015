/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class EnemyMediator extends MvcModule.Mediator
    {
        static NAME:string = "EnemyMediator";

        moveVO:ConnectionModule.MoveVO;

        constructor(viewComponent:MvcModule.View){

            EventsModule.SignalsManager.getInstance().createBinding("move", function(){},this);
            EventsModule.SignalsManager.getInstance().createBinding("CharacterDamage", function(damage:number){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.DAMAGE_COMPLETE, damage);
            },this);
            EventsModule.SignalsManager.getInstance().createBinding("CharacterPosition", function(body:any){

                if(body.addActionRay == true)
                {
                    MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHARACTER_POSITION, body);
                }
            }, this);

            super(viewComponent);
        }

        onRegister(){
            this.moveVO = new ConnectionModule.MoveVO();

            (this.viewComponent as EnemyView).createCharacter('bacon');
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