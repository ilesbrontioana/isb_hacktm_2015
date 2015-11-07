/**
 * Created by adm on 07.11.15.
 */
module GridModule
{
    export class GridMediator extends MvcModule.Mediator{
        static NAME:string = this + "GridMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
            MvcModule.Mvc.getInstance().sendNotification(GridModule.GridNotifications.GRID_CREATED, viewComponent.getTiles());
        }

        listNotificationInterests():Array{
            return [];
        }

        handleNotification(notification:MvcModule.INotification) {
            console.log(notification.name + " " + notification.body);
        }
    }
}