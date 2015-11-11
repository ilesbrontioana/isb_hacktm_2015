/**
 * Created by adm on 07.11.15.
 */
module WelcomeModule{
    export class WelcomeMediator extends MvcModule.Mediator{
        static NAME:string = "WelcomeMediator";

        constructor(viewComponent:MvcModule.View){
            super(WelcomeMediator.NAME, viewComponent);
        }

        listNotificationInterests():Array<string>{
            return [];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {

            }
        }
    }
}
