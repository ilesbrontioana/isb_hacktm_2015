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
            return [CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION, CharacterModule.CharacterNotifications.GRID_TOUCHED];
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
            }
        }
    }
}