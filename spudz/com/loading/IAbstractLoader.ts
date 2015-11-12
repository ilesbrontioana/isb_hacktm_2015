/**
 * Created by ioanailes on 12/11/15.
 */
module LoadingModule
{
    export interface IAbstractLoader
    {
        startLoading();

        addOnFileComplete(callback:Function);

        addOnComplete(callback:Function);
    }
}