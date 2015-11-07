/**
 * Created by adm on 06.11.15.
 */
    /// <reference path="UINotifications.ts" />
module UserInterfaceModule{

    export class UIMediator extends MvcModule.Mediator
    {
        static  NAME:string = this+"UIMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
        }

        listNotificationInterests():Array{
            return [UserInterfaceModule.UINotifications.HIDE_ACTIONS_MENU,
                UserInterfaceModule.UINotifications.SHOW_ACTIONS_MENU,
                UserInterfaceModule.UINotifications.UPDATE_LIFE,
                UserInterfaceModule.UINotifications.SHOW_MOVE_MENU,
                UserInterfaceModule.UINotifications.HIDE_MOVE_MENU,
                UserInterfaceModule.UINotifications.UPDATE_LIFE_ENEMY];
        }

        handleNotification(notification:MvcModule.INotification){
            console.log(notification.name+" "+notification.body);
            switch (notification.name){
                case UserInterfaceModule.UINotifications.HIDE_ACTIONS_MENU:
                    this.viewComponent.hideActionsMenu();
                    break;
                case UserInterfaceModule.UINotifications.SHOW_ACTIONS_MENU:
                    break;
                case  UserInterfaceModule.UINotifications.UPDATE_LIFE:
                    break;
                case UserInterfaceModule.UINotifications.UPDATE_LIFE_ENEMY:
                    break;
                case UserInterfaceModule.UINotifications.SHOW_MOVE_MENU:
                    break;
                case UserInterfaceModule.UINotifications.HIDE_MOVE_MENU:
                    break;
            }
        }
    }
}