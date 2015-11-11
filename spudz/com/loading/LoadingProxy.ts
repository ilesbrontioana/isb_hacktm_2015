/**
 * Created by ioanailes on 11/11/15.
 */
module LoadingModule
{
    export class LoadingProxy extends MvcModule.Proxy
    {
        static NAME:string = "LoadingProxy";

        constructor()
        {
            super();

            LoadingModule.LoadingManager.getInstance().addOnFileComplete(this.fileComplete);
            LoadingModule.LoadingManager.getInstance().addOnComplete(this.loadComplete);
        }

        startLoading()
        {
            LoadingModule.LoadingManager.getInstance().startLoading();
        }

        fileComplete(progress, cacheKey, success, totalLoaded, totalFiles)
        {
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingNotifications.UPDATE_LOADING_PROGRESS, progress);
        }

        loadComplete()
        {
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingNotifications.LOADING_COMPLETE);
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingCompleteCommand.NAME);
        }


    }
}