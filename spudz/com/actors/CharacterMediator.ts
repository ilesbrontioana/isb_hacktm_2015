/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterMediator extends MvcModule.Mediator{
        static NAME:string = this + "CharacterMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
        }

        listNotificationInterests():Array{
            return [CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION,
                CharacterModule.CharacterNotifications.GRID_TOUCHED,
                CharacterModule.CharacterNotifications.BLOCK,
                CharacterModule.CharacterNotifications.MOVE,
                CharacterModule.CharacterNotifications.MELEE,
                CharacterModule.CharacterNotifications.RANGE,
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
                case GridModule.GridNotifications.GRID_CREATED:
                    this.viewComponent.gridCreated(notification.body)
                    break
            }
        }
    }
}