/**
 * Created by adm on 07.11.15.
 */
module GridModule
{
    export class GridMediator extends MvcModule.Mediator{
        static NAME:string = "GridMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
        }

        onRegister()
        {
            MvcModule.Mvc.getInstance().sendNotification(GridModule.GridNotifications.GRID_CREATED, (this.viewComponent as GridView).getTiles());
        }

        listNotificationInterests():Array<string>{
            return [];
        }

        handleNotification(notification:MvcModule.INotification) {
            console.log(notification.name + " " + notification.body);
        }
    }
}