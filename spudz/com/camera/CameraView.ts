/**
 * Created by ioanailes on 02/12/15.
 */
module CameraModule
{
    export class CameraView extends MvcModule.View
    {
        static NAME:string = "CameraView";

        constructor()
        {
            super(CameraView.NAME);

            var bmd = this.game.add.bitmapData(4, 4);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0,0,4,4);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            this.game.cache.addBitmapData("CameraRectangleBMP", bmd);

            this.tweenObject = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("CameraRectangleBMP"));
            this.tweenObject.alpha = 0;
        }

        tweenObject:Phaser.Sprite;
        tween:Phaser.Tween;
        followCharacter:boolean;

        zoomTween:Phaser.Tween;
        zoomTweenObject = new ZoomTweenObject();
        zooming:boolean;

        setCameraFollower(character:Phaser.Sprite)
        {
            this.followCharacter = true;
            this.game.camera.follow(character);
            this.tweenObject.x = character.x;
            this.tweenObject.y = character.y;
        }

        setCameraPosition(x:number, y:number)
        {
            this.followCharacter = false;
            this.game.camera.follow(this.tweenObject);
            this.tweenObject.x = x;
            this.tweenObject.y = y;
        }

        moveCamera(initialX:number, initialY: number, x:number, y:number)
        {

            if(this.followCharacter)
            {
                this.tweenObject.x = initialX;
                this.tweenObject.y = initialY;
            }

            this.game.camera.follow(this.tweenObject);
            this.tween = this.game.add.tween(this.tweenObject).to(
                {   x: x,
                    y: y
                }, 200, "Linear", true);

            this.tween.onComplete.removeAll();
            this.tween.onComplete.add( this.moveComplete ,this);
        }

        zoom(percent)
        {
            this.zooming = true;
            var finalZoom:boolean = percent/100;
            this.zoomTween = this.game.add.tween(this.zoomTweenObject).to(
                {
                    worldScale: finalZoom
                }, 200, "Linear", true);

            this.zoomTween.onComplete.removeAll();
            this.zoomTween.onComplete.add( this.zoomComplete ,this);
        }

        zoomComplete()
        {
            this.zooming = false;
        }

        updateCamera()
        {
            if(this.zooming)
            {
                this.game.world.scale.set(this.zoomTweenObject.worldScale);
            }
        }

        moveComplete()
        {
            this.dispatchSignal("CameraMoveComplete");
        }


    }

    class ZoomTweenObject
    {
        worldScale:number = 1;
    }
}