/**
 * Created by Ioana on 11/3/2015.
 */
module CharacterModule
{
    import SignalsManager = EventsModule.SignalsManager;
    export class Character
    {
        graphics;
        //playerGraphics;
        assetPath = '../../spudz/bin/assets/character/';

        canMove = true;
        moving = false;

        speed = 700;

        tween;

        constructor() {

            //var bmd = GameControllerModule.GameController.getInstance().game.add.bitmapData(4, 4);
            //bmd.ctx.fillStyle = '#CCCCCC';
            //bmd.ctx.beginPath();
            //bmd.ctx.fillRect(0,0,4,4);
            //bmd.ctx.closePath();
            //bmd.ctx.fill();
            //GameControllerModule.GameController.getInstance().game.cache.addBitmapData("SmallRectangleBMP", bmd);

        }

        load( characterName)
        {
            GameControllerModule.GameController.getInstance().game.load.image(characterName, this.assetPath + characterName +'.png');
        }

        createCharacter(characterName, x, y, followCharacter = false)
        {

            this.graphics = GameControllerModule.GameController.getInstance().game.add.sprite(x, y, characterName);

            GameControllerModule.GameController.getInstance().game.physics.enable(this.graphics, Phaser.Physics.ARCADE);

            this.graphics.body.collideWorldBounds = true;
            this.graphics.body.gravity.y = 400;

            this.graphics.body.friction = 400;
            this.graphics.body.mass = 400;

            this.graphics.body.speed = this.speed;

            this.graphics.body.setSize(10, 10, this.graphics.width/2 - 5, this.graphics.height - 10);

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.graphics);
            }

            SignalsManager.getInstance().createBinding("TiledClicked", this.moveCharacter, this);

        }

        moveCharacter(tile)
        {
            if(this.canMove == false)
            {
                return;
            }

            var distance = GameControllerModule.GameController.getInstance().game.physics.arcade.distanceBetween(this.graphics,tile);
            var tweenDuration = distance/this.speed;

            this.tween = GameControllerModule.GameController.getInstance().game.add.tween(this.graphics.body.position).to(
                {   x: tile.x,
                    y: tile.y
                }, tweenDuration * 1000, "Linear", true);

            this.tween.onComplete.removeAll();
            this.tween.onComplete.add( this.onCompleteTween ,this);

            this.tween.start();

            this.canMove = false;
            this.moving = true;
        }

        onCompleteTween()
        {
            this.moving = false;
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.canMove = true;
        }

        updateCharacter()
        {

        }

    }
}