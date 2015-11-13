/**
 * Created by ioanailes on 12/11/15.
 */
module ServerMockModule
{
    import IView = MvcModule.IView;
    import SignalsManager = EventsModule.SignalsManager;
    export class ServerMockMediator extends MvcModule.Mediator
    {
        static NAME:string = "ServerMockMediator";


        constructor(viewComponent:MvcModule.IView)
        {
            super(ServerMockMediator.NAME, viewComponent);
        }

        onRegister()
        {
            this.addListenerToSignal(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, function (selection:string) {

                var randomTime:number = Math.random() * 5;
                GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * randomTime, function()
                {
                    var opponentSelection:string;
                    var opponentSelectionNo = Math.random() * 3;
                    if(opponentSelectionNo < 1)
                    {
                        opponentSelection = "pirate";
                    }
                    else if(opponentSelectionNo < 2)
                    {
                        opponentSelection = "bacon";
                    }
                    else
                    {
                        opponentSelection = "marine";
                    }
                    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.OPPONENT_CHARACTER, opponentSelection);
                }.bind(this), this);
            });
        }

        listNotificationInterests():Array<string>{
            return [RoundsModule.RoundsNotifications.FIGHT];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {
                case RoundsModule.RoundsNotifications.FIGHT:
                    //var turn:number = Math.random() * 2;
                    //if(turn < 1)
                    //{
                    //    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.MOVE);
                    //}
                    //else
                    //{
                    MvcModule.Mvc.getInstance().sendNotification(ConnectionModule.ConnectionSignals.YOUR_TURN);
                    //}
                    break;

            }
        }
    }
}