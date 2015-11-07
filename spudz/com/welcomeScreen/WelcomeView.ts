/**
 * Created by adm on 07.11.15.
 */
module WelcomeModule{
    export class WelcomeView extends MvcModule.View{
        constructor(){
            super();
            var bmd = this.game.add.image(50,50,"ui", "button.png")

            bmd.inputEnabled = true;
            bmd.events.onInputDown.add(this.onStartGamePressed, this);
        }

        onStartGamePressed(){
            this.dispatchSignal("StartGame");
        }
    }
}