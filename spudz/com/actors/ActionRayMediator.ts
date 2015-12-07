/**
 * Created by Ioana on 11/7/2015.
 */

module CharacterModule {
    import UIMediator = UserInterfaceModule.UIMediator;
    export class ActionRayMediator extends MvcModule.Mediator {

        static NAME:string = "ActionRayMediator";

        constructor(viewComponent:MvcModule.View) {
            super(ActionRayMediator.NAME, viewComponent);
            this.addListenerToSignal("CircleTouched", function(tile:Phaser.Sprite){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.GRID_TOUCHED, tile);
            }, this);
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.CHARACTER_POSITION,
                    GridModule.GridNotifications.GRID_CREATED,
                    CharacterModule.CharacterActionType.ATTACK,
                    UserInterfaceModule.UINotifications.WEAPON_SELECTED
                    ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.CHARACTER_POSITION:
                    (this.viewComponent as ActionRayView).addActionRayAt(notification.body.x, notification.body.y, notification.body.actionType);
                    break;
                case GridModule.GridNotifications.GRID_CREATED:
                    (this.viewComponent as ActionRayView).setGrid(notification.body);
                    break;
                case CharacterModule.CharacterActionType.ATTACK:
                    (this.viewComponent as ActionRayView).removeActionRay();
                    break;
                case UserInterfaceModule.UINotifications.WEAPON_SELECTED:
                    var characterProxy:CharacterModule.CharacterProxy = MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterModule.CharacterProxy;
                    (this.viewComponent as ActionRayView).addActionRayAt(characterProxy.getCharacter().x, characterProxy.getCharacter().y, notification.body);
                    break;
            }
        }
    }
}