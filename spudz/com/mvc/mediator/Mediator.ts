/**
 * Created by adm on 05.11.15.
 */
module MvcModule {
    export class Mediator {
        public viewComponent:View;

        constructor(viewComponent:View) {
            this.viewComponent = viewComponent;
        }

        public onRegister() {
            console.log("MEDIATOR REGISTERED")
        }

        public listNotificationInterests():Array<string> {
            return [];
        }

        public handleNotification(notification:INotification) {

        }
    }
}