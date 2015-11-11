/**
 * Created by ioanailes on 10/11/15.
 */
module BackgroundModule
{
    export class BackgroundView extends MvcModule.View
    {

        static NAME:string = "BackgroundView";
        graphics:Phaser.Image;

        constructor()
        {
            super(BackgroundView.NAME);
            this.graphics = this.game.add.image(0,0,'background');
        }
    }
}