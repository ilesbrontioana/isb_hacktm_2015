/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterView extends MvcModule.View{
        graphics;

        canMove = true;
        moving = false;

        speed = 1000;

        verticalRectangle;
        horizontalRectangle;

        constructor() {
            this.createCharacter('pirate_test', 640, 300, true);

            this.createBitmapDataRectangles();
        }

        createBitmapDataRectangles()
        {
            var bmd = GameControllerModule.GameController.getInstance().game.add.bitmapData(4, 4);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0,0,4,4);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            GameControllerModule.GameController.getInstance().game.cache.addBitmapData("SmallRectangleBMP", bmd);

            this.verticalRectangle  = GameControllerModule.GameController.getInstance().game.add.sprite(0, 0, GameControllerModule.GameController.getInstance().game.cache.getBitmapData("SmallRectangleBMP"));
            this.horizontalRectangle  = GameControllerModule.GameController.getInstance().game.add.sprite(0, 0, GameControllerModule.GameController.getInstance().game.cache.getBitmapData("SmallRectangleBMP"));
            this.verticalRectangle.alpha = 0;
            this.horizontalRectangle.alpha = 0;
            this.horizontalRectangle.width = 2000;
            this.verticalRectangle.height = 1400;

            GameControllerModule.GameController.getInstance().game.physics.enable(this.horizontalRectangle, Phaser.Physics.ARCADE);
            GameControllerModule.GameController.getInstance().game.physics.enable(this.verticalRectangle, Phaser.Physics.ARCADE);


            this.horizontalRectangle.body.immovable = true;
            this.verticalRectangle.body.immovable = true;
        }

        createCharacter(characterName, x, y, followCharacter = false)
        {

            this.graphics = GameControllerModule.GameController.getInstance().game.add.sprite(x, y, characterName);

            GameControllerModule.GameController.getInstance().game.physics.enable(this.graphics, Phaser.Physics.ARCADE);

            this.graphics.body.collideWorldBounds = true;
            this.graphics.body.gravity.y = 400;

            this.graphics.body.speed = this.speed;

            this.graphics.body.setSize(50, this.graphics.height, this.graphics.width/2 - 30, 0);

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.graphics);
            }
        }

        checkCollision(map){
            GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, map);

            if(this.moving)
            {
                GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, this.verticalRectangle, this.collideWithRectangle, null, this);
                GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, this.horizontalRectangle, this.collideWithRectangle, null, this);
            }
        }

        collideWithRectangle()
        {
            this.moving =  false;
        }

        moveCharacter(tile)
        {
            this.tile = tile;

            this.verticalRectangle.x = this.tile.x - this.tile.width/2;
            this.horizontalRectangle.y = this.tile.y - this.tile.height/2;

            this.moving = true;
            GameControllerModule.GameController.getInstance().game.physics.arcade.moveToXY(this.graphics, tile.x, tile.y, 700);
         }


        tile;

        updateCharacter() {

        }
    }
}