/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterView extends MvcModule.View{
        graphics;
        //playerGraphics;
        assetPath = '../../spudz/bin/assets/character/';

        canMove = true;
        moving = false;

        speed = 5000;

        tween;

        constructor() {
            this.createCharacter('pirate_test', 560, 1120, true);
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

            this.graphics.body.speed = this.speed;

            this.graphics.body.setSize(10, 10, this.graphics.width/2 - 5, this.graphics.height - 10);

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.graphics);
            }
        }

        checkCollision(map){
            GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, map);
        }

        moveCharacter(tile)
        {
            this.tile = tile;
        }

        tile;

        updateCharacter() {
            if(!GameControllerModule.GameController.getInstance().inputOngoing){
                if(this.canMove) {
                    this.graphics.body.velocity.x = 0;
                    this.graphics.body.velocity.y = 0;
                }
                this.canMove = false;
            } else {
                this.canMove = true;
                //GameControllerModule.GameController.getInstance().game.physics.arcade.moveToXY(this.graphics, this.tile.x, this.tile.y, 1000);
                GameControllerModule.GameController.getInstance().game.physics.arcade.moveToObject(this.graphics, this.tile, 1000);
            }
        }
    }
}