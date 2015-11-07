/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsMediator extends MvcModule.Mediator{

        static NAME:string = this+"RoundsMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
        }

        listNotificationInterests():Array{
            return [RoundsModule.RoundsNotifications.UPDATE_ROUND];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {
                case RoundsModule.RoundsNotifications.UPDATE_ROUND:
                    MvcModule.Mvc.getInstance().retrieveProxy(RoundsModule.RoundsProxy).setRound(notification.body);
                    break;
            }
        }
    }
}