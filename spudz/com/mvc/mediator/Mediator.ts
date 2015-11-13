/**
 * Created by adm on 05.11.15.
 */

module MvcModule {
    export class Mediator implements IMediator{
        public name:string;
        public viewComponent:IView;
        public signalsManager:ISignalsManager;

        constructor(name:string, viewComponent:IView) {
            this.name = name;
            this.viewComponent = viewComponent;
            this.signalsManager =  Mvc.getInstance().signalsManager;
        }

        public onRegister() {
            this.addSignalListeners();
        }

        public onUnregister() {

        }

        public listNotificationInterests():Array<string> {
            return [];
        }

        public handleNotification(notification:INotification) {

        }

        public dispatchSignal(signalName:string, args?:any){
            this.signalsManager.dispatch(signalName, args)
        }

        public addSignalListeners(){

        }

        public addListenerToSignal(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any){
            this.signalsManager.createBinding(signalName, listener, listenerContext, priority, args)
        }

        public removeListener(signalName:string, listener:Function){
            this.signalsManager.removeListener(signalName, listener);
        }

        public setViewComponent(viewComponent:IView){
            this.viewComponent = viewComponent;
        }

        public getViewComponent():IView{
            return this.viewComponent;
        }

        public sendNotification(notificationName:string, body?:any, type?:string) {
            Mvc.getInstance().sendNotification(notificationName, body, type);
        }
    }
}