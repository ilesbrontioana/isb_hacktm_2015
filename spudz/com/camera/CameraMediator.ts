/**
 * Created by ioanailes on 02/12/15.
 */
module CameraModule
{
    export class CameraMediator extends MvcModule.Mediator
    {
        static NAME:string = "CameraMediator";

        constructor(viewComponent:MvcModule.IView)
        {
            super(CameraMediator.NAME, viewComponent);
        }

        onRegister()
        {
            this.initSignals();
        }

        initSignals()
        {
            this.addListenerToSignal("CameraMoveComplete", function(){
                MvcModule.Mvc.getInstance().sendNotification(CameraModule.CameraNotifications.CAMERA_MOVE_COMPLETE);
            },this);
        }

        listNotificationInterests():Array<string>{
            return [CameraModule.CameraNotifications.MOVE_CAMERA,
                    CameraModule.CameraNotifications.SET_CAMERA_FOLLOWER,
                    CameraModule.CameraNotifications.SET_CAMERA_POSITION,
                    CharacterModule.CharacterNotifications.UPDATE_CHARACTER
                    ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {
                case CameraModule.CameraNotifications.MOVE_CAMERA:
                    (this.viewComponent as CameraView).moveCamera(notification.body.initialX, notification.body.initialY,
                                    notification.body.x, notification.body.y);
                    break;
                case CameraModule.CameraNotifications.SET_CAMERA_FOLLOWER:
                    (this.viewComponent as CameraView).setCameraFollower(notification.body);
                    break;
                case  CameraModule.CameraNotifications.SET_CAMERA_POSITION:
                    (this.viewComponent as CameraView).setCameraPosition(notification.body.x, notification.body.y);
                    break;
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as CameraView).updateCamera();
                    break;
            }
        }
    }
}