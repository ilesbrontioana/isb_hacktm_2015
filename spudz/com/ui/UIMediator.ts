/**
 * Created by adm on 06.11.15.
 */
module UserInterfaceModule{
    export class UIMediator extends MvcModule.Mediator
    {
        static  NAME:string = this+"UIMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
        }

        listNotificationInterests():Array{
            return [];
        }

        handleNotification(notification:MvcModule.INotification){
            console.log(notification.name+" "+notification.body);
        }
    }
}