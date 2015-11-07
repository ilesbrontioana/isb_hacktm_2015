/**
 * Created by adm on 05.11.15.
 */
module MvcModule {
    export class Mediator {
        public viewComponent:View;
        public signalsManager:EventsModule.SignalsManager;

        constructor(viewComponent:View) {
            this.viewComponent = viewComponent;
            this.signalsManager =  EventsModule.SignalsManager.getInstance();
        }

        public onRegister() {
            console.log("MEDIATOR REGISTERED")
        }

        public listNotificationInterests():Array<string> {
            return [];
        }

        public handleNotification(notification:INotification) {

        }

        public dispatchSignal(signalName:string, args?:any){
            this.signalsManager.dispatch(signalName, args)
        }

        public addListenerToSignal(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any){
            this.signalsManager.createBinding(signalName, listener, listenerContext, priority, args)
        }
    }
}