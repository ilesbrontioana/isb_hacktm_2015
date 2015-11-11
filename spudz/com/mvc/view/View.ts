/**
 * Created by adm on 05.11.15.
 */
module MvcModule {
    export class View implements IView{
        public game:Phaser.Game;
        public name:string;

        public signalsManager:EventsModule.SignalsManager;
        constructor(name:string){
            this.name = name;
            this.game = GameControllerModule.GameController.getInstance().game;
            this.signalsManager =  EventsModule.SignalsManager.getInstance();
        }

        public dispatchSignal(signalName:string, args?:any){
            this.signalsManager.dispatch(signalName, args)
        }

        public addListener(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any){
            this.signalsManager.createBinding(signalName, listenerContext, listenerContext, priority, args)
        }

        public removeListener(signalName:string, listener:Function){

        }
    }
}