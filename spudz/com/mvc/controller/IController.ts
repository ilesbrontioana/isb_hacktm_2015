/**
 * Created by adm on 11.11.15.
 */
module MvcModule{
    export interface IController{
        name:string;

        execute(notification:INotification):void
        onRegister():void
        onUnregister():void
    }
}