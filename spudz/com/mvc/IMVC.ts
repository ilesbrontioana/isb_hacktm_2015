/**
 * Created by adm on 13.11.15.
 */
module MvcModule{
    export interface IMVC{
        signalsManager:ISignalsManager;

        registerNotification(notificationName:string, scope?:string):void
        unregisterNotification(notificationName:string, scope:string ):void

        registerCommand(commandName:string, command:IController, scope?:string ):void
        unregisterCommand(commandName:string, scope:string ):void

        registerProxy(proxyName:string, proxy:IProxy, scope?:string ):void
        retrieveProxy(proxyName:string, scope?:string ):IProxy
        unregisterProxy(proxyName:string, scope?:string ):void

        registerMediator(mediatorName:string, mediator:IMediator, scope?:string ):void
        unregisterMediator(mediatorName:string, scope?:string ):void

        sendNotification(notificationName:string, body?:any, scope?:string ,type?:string):void
        sendGlobalNotification(notificationName:string, body?:any,type?:string):void
    }

    export interface IMVCCore{
        name:string;

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
