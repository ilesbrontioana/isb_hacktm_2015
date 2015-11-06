/**
 * Created by Ioana on 11/3/2015.
 */
module CharacterModule
{
    import SignalsManager = EventsModule.SignalsManager;
    export class Character
    {
        graphics;

        newX;
        newY;
        assetPath = '../../spudz/bin/assets/character/';

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
            this.graphics.body.gravity.y = 200;

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.graphics);
            }

            SignalsManager.getInstance().createBinding("TiledClicked", this.moveCharacter, this)
        }

        moveCharacter(tile)
        {
            this.newX = tile.x;
            this.newY = tile.y;
            this.graphics.x = this.newX;
            this.graphics.y = this.newY;
            //GameControllerModule.GameController.getInstance().game.physics.arcade.moveToXY(this.graphics, this.newX, this.newY, 300);
        }

        updateCharacter()
        {
            //if(GameControllerModule.GameController.getInstance().game.physics.arcade.distanceToXY(this.graphics, this.newX, this.newY) < 50)
            //{
            //    this.graphics.body.velocity.x = 0;
            //    this.graphics.body.velocity.y = 0;
            //    this.graphics.body.x = this.newX;
            //    this.graphics.body.y = this.newY;
            //}
        }
    }
}