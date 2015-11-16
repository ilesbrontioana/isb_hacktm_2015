/**
 * Created by Ioana on 11/7/2015.
 */

module CharacterModule {
    export class ActionRayMediator extends MvcModule.Mediator {

        static NAME:string = "ActionRayMediator";

        constructor(viewComponent:MvcModule.View) {
            super(ActionRayMediator.NAME, viewComponent);
            this.addListenerToSignal("TiledClicked", function(tile:Phaser.Sprite){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.GRID_TOUCHED, tile);
            }, this);
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.CHARACTER_POSITION,
                    GridModule.GridNotifications.GRID_CREATED,
                    CharacterModule.CharacterActionType.ATTACK
                    ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.CHARACTER_POSITION:
                    (this.viewComponent as ActionRayView).addActionRayAt(notification.body.x, notification.body.y, notification.body.actionType);
                    (MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME) as CharacterProxy).setActionRay((this.viewComponent as ActionRayView).currentCircle)
                    break;
                case GridModule.GridNotifications.GRID_CREATED:
                    (this.viewComponent as ActionRayView).setGrid(notification.body);
                    break;
                case CharacterModule.CharacterActionType.ATTACK:
                    (this.viewComponent as ActionRayView).removeActionRay();
                    break;
            }
        }
    }
}