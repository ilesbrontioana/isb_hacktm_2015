/**
 * Created by ioanailes on 11/11/15.
 */
module LoadingModule
{
    export class LoadingManager
    {

        private static _instance:LoadingManager = new LoadingManager();

        constructor(){
            if(LoadingManager._instance){
                throw new Error("Te Dreq: Instantiation failed: Use LoadingManager.getInstance()");
            }

            LoadingManager._instance = this;
        }

        public static getInstance():LoadingManager {
            return LoadingManager._instance;
        }

        startLoading()
        {
            GraphicsModule.GraphicsManager.getInstance().game.load.start();
        }

        addOnFileComplete(callback:Function)
        {
            GraphicsModule.GraphicsManager.getInstance().game.load.onFileComplete.add(callback, this);
        }

        addOnComplete(callback:Function)
        {
            GraphicsModule.GraphicsManager.getInstance().game.load.onLoadComplete.add(callback, this);
        }
    }
}