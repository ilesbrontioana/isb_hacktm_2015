/**
 * Created by ioanailes on 03/12/15.
 */
module CameraModule
{
    export class CameraNotifications
    {
        static  NAME:string = "_camera_notifications_";

        static  MOVE_CAMERA:string = CameraNotifications.NAME + "MOVE_CAMERA";
        static  SET_CAMERA_FOLLOWER:string = CameraNotifications.NAME + "SET_CAMERA_FOLLOWER";
        static  SET_CAMERA_POSITION:string = CameraNotifications.NAME + "SET_CAMERA_POSITION";
        static  CAMERA_MOVE_COMPLETE:string = CameraNotifications.NAME + "CAMERA_MOVE_COMPLETE";

    }
}