/**
 * Created by Ioana on 11/3/2015.
 */
module CharacterModule
{
    export class CharacterLoader
    {
        static load(game, characterName, characterPath)
        {
            game.load.image(characterName, characterPath);
        }
    }
    export class Character
    {
        game;
        character;

        newX;
        newY;

        freezed = false;

        constructor(game, characterName, characterPath)
        {
            this.game = game;
        }

        createCharacter(characterName, x, y, followCharacter)
        {
            this.character = this.game.add.sprite(x, y, characterName);
            this.character.scale.setTo(4,4);

            this.game.physics.enable(this.character);

            this.character.body.bounce.y = 0.2;
            this.character.body.linearDamping = 1;
            this.character.body.collideWorldBounds = true;

            if(followCharacter == true)
            {
                this.game.camera.follow(this.character);
            }
        }

        moveCharacter(x, y) {
            if(this.freezed == false)
            {
                this.newX = x;
                this.newY = y;
                this.game.physics.arcade.moveToXY(this.character, this.newX, this.newY, 600);
            }
        }

        updateCharacter()
        {
            if(this.character.x >= this.newX && this.character.x < this.newX + 15)
            {
                this.character.body.velocity.x = 0;
            }

            if(this.character.y >= this.newY && this.character.y < this.newY + 15)
            {
                this.character.body.velocity.y = 0;
            }
        }

        freezeCharacter()
        {
            //if(this.character.body.velocity.x != 0)
            //{
            //    this.character.body.velocity.setTo(0,0);
            //    //this.character.body.gravity.y = 0;
            //    this.freezed = true;
            //}

        }

        unfreezeCharacter()
        {
            if(this.freezed == true)
            {
                //this.character.body.gravity.y = 400;
                this.game.physics.arcade.moveToXY(this.character, this.newX, this.newY, 600);
                this.freezed = false;
            }
        }
    }
}