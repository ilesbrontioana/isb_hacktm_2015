/**
 * Created by adm on 05.11.15.
 */
/// <reference path="notification/INotification.ts" />
/// <reference path="notification/Notification.ts" />
/// <reference path="controller/Controller.ts" />
/// <reference path="controller/IController.ts" />
/// <reference path="proxy/Proxy.ts" />
/// <reference path="proxy/IProxy.ts" />
/// <reference path="mediator/Mediator.ts" />
/// <reference path="mediator/IMediator.ts" />
/// <reference path="view/View.ts" />
/// <reference path="view/IView.ts" />

module MvcModule{
    export class Mvc{
        private static _instance:Mvc = new Mvc();

        public commands:ICommandIndex = {};
        public notifications:INotificationIndex = {};
        public proxies:IProxyIndex = {};
        public mediators:IMediatorIndex = {};

        constructor(){
            if(Mvc._instance){
                throw new Error("Te Dreq: Instantiation failed: Use SignalsManager.getInstance()");
            }
            Mvc._instance = this;
        }

        public static getInstance():Mvc {
            return Mvc._instance;
        }

        public registerNotification(notificationName:string){
            if(!this.notifications[notificationName]){
                this.notifications[notificationName] = new Array<IMediator>();
            }
        }

        public unregisterNotification(notificationName:string){
            delete this.notifications[notificationName];
        }

        public registerCommand(commandName:string, command:IController) {
            if(!this.commands[commandName]){
                this.commands[commandName] = command;
            }

            command.onRegister();
        }

        public unregisterCommand(commandName:string){
            this.commands[commandName].onUnregister();
            delete this.commands[commandName];
        }

        public registerProxy(proxyName:string, proxy:IProxy){
            if(!this.proxies[proxyName]){
                this.proxies[proxyName] = proxy;
            }
            proxy.onRegister();
        }

        public retrieveProxy(proxyName:string):IProxy{
            return this.proxies[proxyName];
        }

        public unregisterProxy(proxyName:string){
            this.proxies[proxyName].onUnregister();
            delete this.proxies[proxyName];
        }

        public registerMediator(mediatorName:string, mediator:IMediator){
            if(!this.mediators[mediatorName]){
                this.mediators[mediatorName] = mediator;
                mediator.onRegister();
                for(var i=0; i<mediator.listNotificationInterests().length; i++){
                    this.registerNotification(mediator.listNotificationInterests()[i]);
                    this.notifications[mediator.listNotificationInterests()[i]].push(mediator)
                }
            }
        }

        public unregisterMediator(mediatorName:string){
            var targetMediator = this.mediators[mediatorName]
            var interestedNotifications = targetMediator.listNotificationInterests();
            for(var i=0; i<interestedNotifications.length; i++){
              var listeningMediators = this.notifications[interestedNotifications[i]];
                for(var j=0; j<listeningMediators.length; j++){
                    if(listeningMediators[j] === targetMediator){
                        listeningMediators.splice(j,1);
                    }
                }
            }

            targetMediator.onUnregister();
            delete this.mediators[mediatorName];
        }

        public sendNotification(notificationName:string, body?:any, type?:string){
            if(this.commands[notificationName]) {
                var notification:Notification = new Notification();
                notification.body = body;
                notification.name = notificationName;
                this.commands[notificationName].execute({name: notificationName, body: body});
            }
            this.notifyMediators(notificationName, body, type);
        }

        private notifyMediators(notificationName:string, body:any, type?:string){
            if(this.notifications[notificationName]){
                for(var i = 0; i<this.notifications[notificationName].length; i++){
                    var notification:Notification = new Notification();
                    notification.body = body;
                    notification.name = notificationName;
                    this.notifications[notificationName][i].handleNotification(notification);
                }
            }
        }
    }

    export interface ICommandIndex{
        [commandName:string]:IController
    }

    export interface INotificationIndex {
        [notificationName:string]:Array<IMediator>
    }

    export interface IProxyIndex{
        [proxyName:string]:IProxy;
    }

    export interface IMediatorIndex{
        [mediatorName:string]:IMediator
    }
}