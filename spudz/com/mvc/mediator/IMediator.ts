/**
 * Created by adm on 11.11.15.
 */
module MvcModule{
    export interface IMediator{
        name:string;

        onRegister():void
        onUnregister():void
        listNotificationInterests():Array<string>
        handleNotification(notification:INotification):void
        dispatchSignal(signalName:string, args?:any):void
        addListenerToSignal(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any):void
        getViewComponent():IView
        setViewComponent(viewComponent:IView):void
    }
}