/**
 * Created by Ioana on 11/7/2015.
 */
module CharacterModule {
    export class ActionRayMediator extends MvcModule.Mediator {
        static NAME:string = this + "ActionRayMediator";

        constructor(viewComponent:MvcModule.View) {
            super(viewComponent);
            EventsModule.SignalsManager.getInstance().createBinding("TiledClicked", function(tile){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.GRID_TOUCHED, tile);
            }, this);
        }

        listNotificationInterests():Array{
            return [CharacterModule.CharacterNotifications.CHARACTER_POSITION,
                    GridModule.GridNotifications.GRID_CREATED
                    ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.CHARACTER_POSITION:
                    this.viewComponent.addActionRayAt(notification.body.x, notification.body.y, notification.body.actionType);
                    break;
                case GridModule.GridNotifications.GRID_CREATED:
                    this.viewComponent.setGrid(notification.body);
                    break;
            }
        }
    }
}