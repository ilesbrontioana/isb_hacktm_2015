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
                UserInterfaceModule.UINotifications.DISABLE_MELEE_ACTION_BUTTON,
                UserInterfaceModule.UINotifications.DISABLE_RANGE_ACTION_BUTTON,
                UserInterfaceModule.UINotifications.UPDATE_LIFE_ENEMY,
                UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                CharacterModule.CharacterNotifications.GRID_TOUCHED];
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
                case UserInterfaceModule.UINotifications.DISABLE_MELEE_ACTION_BUTTON:
                    (this.viewComponent as UIView).disableMeleeButton();
                    break;
                case UserInterfaceModule.UINotifications.DISABLE_RANGE_ACTION_BUTTON:
                    (this.viewComponent as UIView).disableRangeButton();
                    break;
                case  UserInterfaceModule.UINotifications.UPDATE_LIFE:
                    (this.viewComponent as UIView).updateLife(notification.body);
                    break;
                case UserInterfaceModule.UINotifications.UPDATE_LIFE_ENEMY:
                    (this.viewComponent as UIView).updateEnemyLife(notification.body);
                    break;
                case UserInterfaceModule.UINotifications.SHOW_MOVE_MENU:
                    (this.viewComponent as UIView).showMoveMenu(MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME).VO.character);
                    break;
                case UserInterfaceModule.UINotifications.UPDATE_ENERGY:
                    (this.viewComponent as UIView).updateEnergy(notification.body);
                    break;
                case UserInterfaceModule.UINotifications.HIDE_MOVE_MENU:
                    (this.viewComponent as UIView).hideMoveMenu();
                    break;
                case CharacterModule.CharacterNotifications.GRID_TOUCHED:
                    (this.viewComponent as UIView).drainEnergy();
                    break;
            }
        }

        doPlayerAction(actionType:string){
            MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterActionType.ATTACK, actionType);
            if(actionType!=CharacterModule.CharacterActionType.SKIP)
                (this.viewComponent as UIView).drainEnergy();
        }
    }
}