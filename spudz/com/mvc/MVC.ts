/**
 * Created by adm on 05.11.15.
 */
/// <reference path="notification/INotification.ts" />
/// <reference path="notification/Notification.ts" />
/// <reference path="controller/Controller.ts" />
/// <reference path="proxy/Proxy.ts" />
/// <reference path="mediator/Mediator.ts" />
/// <reference path="mediator/View.ts" />

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

        public registerCommand(notificationName:string, command:Controller) {
            if(!this.commands[notificationName]){
                this.commands[notificationName] = new Array<Controller>();
            }
            this.commands[notificationName].push(command);
        }

        public registerProxy(proxyName:string, proxy:Proxy){
            if(!this.proxies[proxyName]){
                this.proxies[proxyName] = proxy;
            }
        }

        public registerMediator(mediatorName:string, mediator:Mediator){
            if(!this.mediators[mediatorName]){
                this.mediators[mediatorName] = mediator;
                mediator.onRegister();
                for(var i=0; i<mediator.listNotificationInterests().length; i++){
                    this.registerNotification(mediator.listNotificationInterests()[i], mediator);
                }
            }
        }

        private registerNotification(notificationName:string, mediator:Mediator){
            if(!this.notifications[notificationName]){
                this.notifications[notificationName] = new Array<Mediator>();
            }
            this.notifications[notificationName].push(mediator);
        }

        public sendNotification(notificationName:string, body:any, type?:string){
            if(this.commands[notificationName]) {
                for (var i = 0; i < this.commands[notificationName].length; i++) {
                    var notification:Notification = new Notification();
                    notification.body = body;
                    notification.name = notificationName;
                    this.commands[notificationName][i].execute({name: notificationName, body: body});
                }
            }
            this.notifyMediators(notificationName, body, type);
        }

        public retrieveProxy(proxyName:string):Proxy{
            return this.proxies[proxyName];
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
        [mediatorName:string]:Array
    }

    export interface INotificationIndex {
        [notificationName:string]:Array
    }

    export interface IProxyIndex{
        [proxyName:string]:Proxy;
    }

    export interface IMediatorIndex{
        [mediatorName:string]:Mediator
    }
}