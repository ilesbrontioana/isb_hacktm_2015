/**
 * Created by ioanailes on 12/11/15.
 */
module LoadingModule
{
    export class PhaserLoader implements IAbstractLoader
    {
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