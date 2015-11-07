/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterMediator extends MvcModule.Mediator{
        static NAME:string = this + "CharacterMediator";

        constructor(viewComponent:MvcModule.View){

            EventsModule.SignalsManager.getInstance().createBinding("CharacterPosition", function(body){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHARACTER_POSITION, body);
            }, this);

            super(viewComponent);
        }

        listNotificationInterests():Array{
            return [CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION,
                CharacterModule.CharacterNotifications.GRID_TOUCHED,
                CharacterModule.CharacterNotifications.BLOCK,
                CharacterModule.CharacterNotifications.MOVE,
                CharacterModule.CharacterNotifications.MELEE,
                CharacterModule.CharacterNotifications.RANGE,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterModule.CharacterNotifications.ULTIMATE];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION:
                    this.viewComponent.checkCollision(notification.body)
                    this.viewComponent.updateCharacter();
                    break;
                case CharacterModule.CharacterNotifications.GRID_TOUCHED:
                    this.viewComponent.moveCharacter(notification.body)
                    break;
                case CharacterModule.CharacterNotifications.BLOCK:
                    this.viewComponent.animateBlock(notification.body)
                    break
                case CharacterModule.CharacterNotifications.MOVE:
                    this.viewComponent.animateMove(notification.body)
                    break
                case CharacterModule.CharacterNotifications.MELEE:
                    this.viewComponent.animateMelee(notification.body)
                    break
                case CharacterModule.CharacterNotifications.RANGE:
                    this.viewComponent.animateRange(notification.body)
                    break
                case CharacterModule.CharacterNotifications.ULTIMATE:
                    this.viewComponent.animateUltimate(notification.body)
                    break
                case CharacterModule.CharacterNotifications.TAKE_DAMAGE:
                    this.viewComponent.animateTakeDamage(notification.body);
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.life);
                    break
                case CharacterModule.CharacterNotifications.DRAIN_ENERGY:
                        MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.energy);
                    break
            }
        }
    }
}