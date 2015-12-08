/**
 * Created by ioanailes on 11/11/15.
 */
module LoadingModule
{
    export class LoadingProxy extends MvcModule.Proxy
    {
        static NAME:string = "LoadingProxy";

        loader:IAbstractLoader;

        assetPath:string = '../../spudz/bin/assets/';

        constructor(loader:LoadingModule.IAbstractLoader)
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

        loadAtlas(key:string, path:string, imageName:string, jsonName:string)
        {
            this.loader.loadAtlas(key, this.assetPath + path, imageName, jsonName);
        }

        loadMap(key:string, path:string)
        {
            this.loader.loadMap(key, this.assetPath + path);
        }

        loadBitmapFont(key:string, path:string)
        {
            this.loader.loadBitmapFont(key, this.assetPath + path);
        }

        loadImage(key:string, path:string, imageName:string)
        {
            this.loader.loadImage(key, this.assetPath + path, imageName);
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