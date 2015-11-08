/**
 * Created by adm on 07.11.15.
 */
module WelcomeModule{
    export class WelcomeView extends MvcModule.View{

        bmd:Phaser.Sprite;

        constructor(){
            super();
            this.bmd = this.game.add.image(50,50,"ui", "button.png")

            this.bmd.inputEnabled = true;
            this.bmd.events.onInputDown.add(this.onStartGamePressed, this);
        }

        onStartGamePressed(){
            this.dispatchSignal("StartGame");
            this.bmd.visible = false;
        }
    }
}