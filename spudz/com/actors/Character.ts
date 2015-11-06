/**
 * Created by Ioana on 11/3/2015.
 */
module CharacterModule
{
    import SignalsManager = EventsModule.SignalsManager;
    export class Character
    {
        graphics;

        assetPath = '../../spudz/bin/assets/character/';

        canMove = true;
        moving = false;

        speed = 700;

        tween;

        positionTile;

        constructor() {
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

            this.graphics.body.setSize(50, this.graphics.height, this.graphics.width/2 - 50, 0);

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.graphics);
            }

            SignalsManager.getInstance().createBinding("TiledClicked", this.moveCharacter, this);

        }

        moveCharacter(tile)
        {
            //if(!this.canMove)
            //{
            //    return;
            //}

            this.positionTile = tile;
            GameControllerModule.GameController.getInstance().game.physics.enable(tile, Phaser.Physics.ARCADE);


            var distance = GameControllerModule.GameController.getInstance().game.physics.arcade.distanceBetween(this.graphics,tile);
            var tweenDuration = distance/this.speed;

            this.tween = GameControllerModule.GameController.getInstance().game.add.tween(this.graphics.body.position).to(
                {   x: tile.x,
                    y: tile.y
                }, tweenDuration * 1000, "Linear", true);

            this.tween.onComplete.removeAll();
            this.tween.onComplete.add( this.onCompleteTween ,this);

            this.tween.start();

            //GameControllerModule.GameController.getInstance().game.physics.arcade.moveToXY(this.graphics, tile.x, tile.y, 700);

            this.canMove = false;
            this.moving = true;
        }

        onCompleteTween()
        {
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.canMove = true;
        }

        updateCharacter(collideObjects:Array) {
            for (var i = 0; i < collideObjects.length; i++) {
                GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, collideObjects[i]);
            }

            //if (this.moving) {
            //    GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, this.positionTile, this.characterHitPosition, null, this);
            //}
        }

        characterHitPosition()
        {
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.canMove = true;
            this.moving = false;
        }

    }
}