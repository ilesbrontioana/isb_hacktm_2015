/**
 * Created by adm on 07.11.15.
 */
module GridModule
{
    export class GridMediator extends MvcModule.Mediator{
        static NAME:string = this + "GridMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
            EventsModule.SignalsManager.getInstance().createBinding("TiledClicked", function(tile){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.GRID_TOUCHED, tile);
            }, this);
        }

        listNotificationInterests():Array{
            return [];
        }

        handleNotification(notification:MvcModule.INotification) {
            console.log(notification.name + " " + notification.body);
        }
    }
}