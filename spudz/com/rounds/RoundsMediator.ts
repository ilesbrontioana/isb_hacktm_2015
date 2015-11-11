/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsMediator extends MvcModule.Mediator{

        static NAME:string = "RoundsMediator";

        constructor(viewComponent:MvcModule.View){
            super(RoundsMediator.NAME, viewComponent);
        }

        listNotificationInterests():Array<string>{
            return [RoundsModule.RoundsNotifications.UPDATE_ROUND];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {
                case RoundsModule.RoundsNotifications.UPDATE_ROUND:
                    (MvcModule.Mvc.getInstance().retrieveProxy(RoundsModule.RoundsProxy.NAME) as RoundsProxy).setRound(notification.body);
                    break;
            }
        }
    }
}