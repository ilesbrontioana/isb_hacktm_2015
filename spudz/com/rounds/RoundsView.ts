/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsView extends  MvcModule.View{

        static NAME:string = "RoundsView";

        counterText:Phaser.BitmapText;

        constructor(){
            super(RoundsView.NAME);
            this.counterText = this.game.add.bitmapText(1334/2, 200, 'font','THREE', 50);
            this.counterText.anchor.setTo(0.5, 0.5);
            this.counterText.fixedToCamera = true;
        }

        startCounter()
        {
            GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * 1, function()
            {
                this.counterText.text = 'TWO';
                GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * 1, function()
                {
                    this.counterText.text = 'ONE';
                    GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * 1, function()
                    {
                        this.counterText.text = 'FIGHT';
                        GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * 1, function()
                        {
                            this.counterText.visible = false;
                            this.dispatchSignal("CounterComplete");
                        }.bind(this), this);
                    }.bind(this), this);
                }.bind(this), this);
            }.bind(this), this);


        }
    }
}