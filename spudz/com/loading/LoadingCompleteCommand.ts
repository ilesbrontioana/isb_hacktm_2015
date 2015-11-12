/**
 * Created by ioanailes on 11/11/15.
 */
module LoadingModule
{
    export class LoadingCompleteCommand extends MvcModule.Controller
    {
        static NAME:string = "LoadingCompleteCommand";

        constructor()
        {
            super(LoadingCompleteCommand.NAME);
        }

        public execute(notification:MvcModule.INotification)
        {
            SoundsModule.SoundsManager.getInstance().createSounds();


            MvcModule.Mvc.getInstance().registerMediator(SelectionScreenModule.SelectionScreenMediator.NAME, new SelectionScreenModule.SelectionScreenMediator(new SelectionScreenModule.SelectionScreenView()));
            MvcModule.Mvc.getInstance().registerProxy(SelectionScreenModule.SelectionScreenProxy.NAME, new SelectionScreenModule.SelectionScreenProxy());


            MvcModule.Mvc.getInstance().sendNotification(SelectionScreenModule.SelectionScreenNotifications.WELCOME);

            MvcModule.Mvc.getInstance().registerProxy(ConnectionModule.ConnectionProxy.NAME, new ConnectionModule.ConnectionProxy(new WebSocket("ws://razvanpat.info.tm:8001/")));

        }
    }
}