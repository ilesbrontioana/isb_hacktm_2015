/**
 * Created by adm on 07.11.15.
 */
module SelectionScreenModule{

    export class SelectionScreenMediator extends MvcModule.Mediator{
        static NAME:string = "SelectionScreenMediator";

        constructor(viewComponent:MvcModule.View){
            super(SelectionScreenMediator.NAME, viewComponent);

            this.addListenerToSignal("characterSelected", function(selection:string){
                MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenProxy.NAME).VO.selectedCharacter = selection;
                EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.SELECT_CHARACTER, selection);
            });

            this.addListenerToSignal("StartGame", function(){
               this.sendNotification(RoundsModule.StartMatchCommand.NAME);
            }, this);
        }

        onRegister()
        {
            MvcModule.Mvc.getInstance().registerMediator(DummyAIModule.DummyAIMediator.NAME, new DummyAIModule.DummyAIMediator(new DummyAIModule.DummyAIView()));
        }

        listNotificationInterests():Array<string>{
            return [ConnectionModule.ConnectionSignals.MATCH_FOUND,
                    ConnectionModule.ConnectionSignals.OPPONENT_CHARACTER];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {
                case  ConnectionModule.ConnectionSignals.MATCH_FOUND:
                    EventsModule.SignalsManager.getInstance().dispatch(ConnectionModule.ConnectionSignals.PLAYER_READY);
                    break;
                case ConnectionModule.ConnectionSignals.OPPONENT_CHARACTER:
                    MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenProxy.NAME).VO.opponentSelection = notification.body as string;
                    (this.viewComponent as SelectionScreenView).addOpponent(notification.body as string);
                    break;
            }
        }
    }
}
