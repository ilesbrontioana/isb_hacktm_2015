/**
 * Created by ioanailes on 12/11/15.
 */
module LoadingModule
{
    export interface IAbstractLoader
    {
        startLoading():void;

        addOnFileComplete(callback:Function):void;

        addOnComplete(callback:Function):void;

        loadAtlas(key:string, path:string, imageName:string, jsonName:string):void;

        loadMap(key:string, path:string):void;

        loadBitmapFont(key:string, path:string):void;

        loadImage(key:string, path:string, imageName:string):void;
    }
}