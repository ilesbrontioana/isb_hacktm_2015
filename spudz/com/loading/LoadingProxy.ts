/**
 * Created by ioanailes on 11/11/15.
 */
module LoadingModule
{
    export class LoadingProxy extends MvcModule.Proxy
    {
        static NAME:string = "LoadingProxy";

        loader:IAbstractLoader;

        constructor(loader)
        {
            super(LoadingProxy.NAME);

            this.loader = loader;
            this.loader.addOnFileComplete(this.fileComplete);
            this.loader.addOnComplete(this.loadComplete);
        }

        startLoading()
        {
            this.loader.startLoading();
        }

        fileComplete(progress:any, cacheKey:any, success:any, totalLoaded:any, totalFiles:any)
        {
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingNotifications.UPDATE_LOADING_PROGRESS, progress);
        }

        loadComplete()
        {
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingCompleteCommand.NAME);
        }


    }
}