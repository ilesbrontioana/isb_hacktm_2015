/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsMediator extends MvcModule.Mediator{

        static NAME:string = "RoundsMediator";

        constructor(viewComponent:MvcModule.View){
            super(RoundsMediator.NAME, viewComponent);
        }

        onRegister()
        {
            this.addListenerToSignal("CounterComplete", function(){
                this.sendNotification(RoundsModule.RoundsNotifications.FIGHT);
            }, this);
        }

        listNotificationInterests():Array<string>{
            return [RoundsModule.RoundsNotifications.UPDATE_ROUND,
                    RoundsModule.RoundsNotifications.START_MATCH];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {
                case RoundsModule.RoundsNotifications.UPDATE_ROUND:
                    (MvcModule.Mvc.getInstance().retrieveProxy(RoundsModule.RoundsProxy.NAME) as RoundsProxy).setRound(notification.body);
                    break;
                case RoundsModule.RoundsNotifications.START_MATCH:
                    (this.viewComponent as RoundsView).startCounter();
                    break;
            }
        }
    }
}