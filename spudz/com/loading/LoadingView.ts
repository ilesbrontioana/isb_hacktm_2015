/**
 * Created by ioanailes on 10/11/15.
 */
module LoadingModule
{
    export class LoadingView extends MvcModule.View
    {
        static NAME:string = "LoadingView";
        background:Phaser.Image;

        loadingBar:Phaser.Image;

        loadingBarTween:Phaser.Tween;
        loadingBarWidth:number;

        loadingBarComplete:boolean = false;

        constructor()
        {
            super(LoadingView.NAME);

            this.background = this.game.add.image(0, 0, "loadingScreen");
            this.background.width = this.game.width;
            this.background.height = this.game.height;

            var bmd = this.game.add.bitmapData(4, 4);
            bmd.ctx.fillStyle = '#FCAF17';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0, 0, 4, 4);
            bmd.ctx.closePath();
            this.game.cache.addBitmapData("LoadingBarBMP", bmd);

            this.loadingBar = this.game.add.image(0, 610, this.game.cache.getBitmapData("LoadingBarBMP"));

            this.loadingBarWidth = this.game.width;

        }

        updateProgress(value:number)
        {
            if (this.loadingBarComplete)
            {
                return;
            }

            //update the width of the colored progress bar to correspond to given percent
            var width:number = this.loadingBarWidth * value;

            if(this.loadingBarTween)
            {
                this.loadingBarTween.stop();
            }

            if (value > 99)
            {
                this.loadingBar.width = width;
                this.loadingBarComplete = true;
            }
            else
            {
                this.loadingBarTween = this.game.add.tween(this.loadingBar).to({width:width }, 1000 - value * 10);
                this.loadingBarTween.start();
            }
        }

        removePreloader()
        {
            this.background.kill();
            this.loadingBar.kill();
        }
    }
}