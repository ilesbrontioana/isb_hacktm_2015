/**
 * Created by ioanailes on 10/11/15.
 */
module BackgroundModule
{
    export class BackgroundView extends MvcModule.View
    {

        graphics:Phaser.Image;

        constructor()
        {
            super();
            this.graphics = this.game.add.image(0,0,'background');
        }
    }
}