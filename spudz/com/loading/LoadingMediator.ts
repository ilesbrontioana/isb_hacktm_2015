/**
 * Created by ioanailes on 10/11/15.
 */
module LoadingModule
{
    export class LoadingMediator extends MvcModule.Mediator
    {
        static NAME:string = "LoaderMediator";

        constructor(viewComponent:MvcModule.IView)
        {
            super(LoadingMediator.NAME, viewComponent);
        }

        listNotificationInterests():Array<string>{
            return [
                LoadingNotifications.LOADING_COMPLETE,
                LoadingNotifications.UPDATE_LOADING_PROGRESS
            ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case LoadingModule.LoadingNotifications.UPDATE_LOADING_PROGRESS:
                    (this.viewComponent as LoadingView).updateProgress(notification.body);
                    break;
                case LoadingModule.LoadingNotifications.LOADING_COMPLETE:
                    (this.viewComponent as LoadingView).removePreloader();
                    break;
            }
        }
    }
}