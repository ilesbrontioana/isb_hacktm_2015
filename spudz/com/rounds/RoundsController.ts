/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsCommand extends MvcModule.Controller{
        static NAME:string = this+"RoundsController";

        execute(notification:MvcModule.INotification){
            MvcModule.Mvc.getInstance().sendNotification(RoundsModule.RoundsNotifications.UPDATE_ROUND, notification.body);
        }
    }
}