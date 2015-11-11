/**
 * Created by ioanailes on 11/11/15.
 */
module BackgroundModule
{
    export class BackgroundMediator extends MvcModule.Mediator
    {
        static NAME:string = "BackgroundMediator";

        constructor(viewComponent:MvcModule.IView)
        {
            super(BackgroundMediator.NAME, viewComponent);
        }
    }
}