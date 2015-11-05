/**
 * Created by Ioana on 11/3/2015.
 */
module CharacterModule
{
    export class Character
    {
        characterImage;

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
            this.characterImage = GameControllerModule.GameController.getInstance().game.add.sprite(x, y, characterName);

            GameControllerModule.GameController.getInstance().game.physics.enable(this.characterImage, Phaser.Physics.ARCADE);

            this.characterImage.body.collideWorldBounds = true;
            this.characterImage.body.gravity.y = 100;

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.characterImage);
            }
        }

        moveCharacter(x, y) {


            this.newX = x;
            this.newY = y;
            GameControllerModule.GameController.getInstance().game.physics.arcade.moveToXY(this.characterImage, this.newX, this.newY, 300);
        }

        updateCharacter()
        {
            if(GameControllerModule.GameController.getInstance().game.physics.arcade.distanceToXY(this.characterImage, this.newX, this.newY) < 10)
            {
                this.characterImage.body.velocity.x = 0;
                this.characterImage.body.velocity.y = 0;
                this.characterImage.body.x = this.newX;
                this.characterImage.body.y = this.newY;
            }
        }
    }
}