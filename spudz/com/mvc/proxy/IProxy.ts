/**
 * Created by adm on 11.11.15.
 */
module MvcModule{
    export interface IProxy{
        VO:any;
        name:string;

        sendNotification(notificationName:string, body?:any, type?:string):void
        onRegister():void
        onUnregister():void
        setVO(vo:any):void
        getVO():any
    }
}