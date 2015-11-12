/**
 * Created by ioanailes on 12/11/15.
 */
module ServerMockModule
{
    import IView = MvcModule.IView;
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
    }
}