/**
 * Created by adm on 06.11.15.
 */
    /// <reference path="UINotifications.ts" />
module UserInterfaceModule{

    export class UIMediator extends MvcModule.Mediator
    {
        static  NAME:string = "UIMediator";

        constructor(viewComponent:MvcModule.View){
            super(UIMediator.NAME, viewComponent);
        }

        onRegister(){
            this.addListenerToSignal("sendAction", this.doPlayerAction, this);
        }

        listNotificationInterests():Array<string>{
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
                    (this.viewComponent as UIView).hideActionsMenu();
                    break;
                case UserInterfaceModule.UINotifications.SHOW_ACTIONS_MENU:
                    (this.viewComponent as UIView).showActionsMenu(MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME).VO.character);
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

        doPlayerAction(actionType:string){
            MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterActionType.ATTACK, actionType);
        }
    }
}