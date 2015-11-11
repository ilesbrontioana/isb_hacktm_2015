/**
 * Created by ioanailes on 11/11/15.
 */
module LoadingModule
{
    export class LoadingCompleteCommand extends MvcModule.Controller
    {
        static NAME:string = "LoadingCompleteCommand";

        public execute(notification:INotification)
        {
            MvcModule.Mvc.getInstance().registerMediator(SelectionScreenModule.SelectionScreenMediator.NAME, new SelectionScreenModule.SelectionScreenMediator(new SelectionScreenModule.SelectionScreenView()));
            MvcModule.Mvc.getInstance().registerProxy(SelectionScreenModule.SelectionScreenProxy.NAME, new SelectionScreenModule.SelectionScreenProxy());

            SoundsModule.SoundsManager.getInstance().createSounds();

            MvcModule.Mvc.getInstance().sendNotification(SelectionScreenModule.SelectionScreenNotifications.WELCOME);

            MvcModule.Mvc.getInstance().registerProxy(ConnectionModule.ConnectionProxy.NAME, new ConnectionModule.ConnectionProxy(new WebSocket("ws://razvanpat.info.tm:8001/")));

        }
    }
}