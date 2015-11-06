/**
 * Created by Ioana on 11/3/2015.
 */
module CharacterModule
{
    import SignalsManager = EventsModule.SignalsManager;
    export class Character
    {
        graphics;

        tile;
        assetPath = '../../spudz/bin/assets/character/';

        moving = false;

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
            this.graphics.body.inertia = 0;

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.graphics);
            }

            SignalsManager.getInstance().createBinding("TiledClicked", this.moveCharacter, this)
        }

        moveCharacter(tile)
        {
            this.tile = tile;

            GameControllerModule.GameController.getInstance().game.physics.enable(this.tile, Phaser.Physics.ARCADE);

            GameControllerModule.GameController.getInstance().game.physics.arcade.moveToXY(this.graphics, tile.x, tile.y, 600);
            this.moving = true;
        }

        updateCharacter()
        {
            //if(this.moving) {
            //    GameControllerModule.GameController.getInstance().game.physics.arcade.overlap(this.graphics, this.tile,
            //        function() {
            //
            //            this.moving = false;
            //            this.graphics.body.velocity.x = 0;
            //            this.graphics.body.velocity.y = 0;
            //        }, null, this);
            //}
        }
    }
}