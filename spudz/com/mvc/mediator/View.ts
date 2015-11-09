/**
 * Created by adm on 05.11.15.
 */
module MvcModule {
    export class View {
        public game:Phaser.Game;
        public signalsManager:EventsModule.SignalsManager;
        constructor(){
            this.game = GameControllerModule.GameController.getInstance().game;
            this.signalsManager =  EventsModule.SignalsManager.getInstance();
        }

        public dispatchSignal(signalName:string, args?:any){
            this.signalsManager.dispatch(signalName, args)
        }

        public addListener(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any){
            this.signalsManager.createBinding(signalName, listenerContext, listenerContext, priority, args)
        }
    }
}