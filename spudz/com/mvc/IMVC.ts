/**
 * Created by adm on 13.11.15.
 */
module MvcModule{
    export interface IMVC{
        signalsManager:ISignalsManager;

        registerNotification(notificationName:string):void
        unregisterNotification(notificationName:string):void

        registerCommand(commandName:string, command:IController):void
        unregisterCommand(commandName:string):void

        registerProxy(proxyName:string, proxy:IProxy):void
        retrieveProxy(proxyName:string):IProxy
        unregisterProxy(proxyName:string):void

        registerMediator(mediatorName:string, mediator:IMediator):void
        unregisterMediator(mediatorName:string):void

        sendNotification(notificationName:string, body?:any, type?:string):void
    }
}
