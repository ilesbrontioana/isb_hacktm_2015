/**
 * Created by Ioana on 11/3/2015.
 */
var CharacterModule;
(function (CharacterModule) {
    var CharacterLoader = (function () {
        function CharacterLoader() {
        }
        CharacterLoader.load = function (game, characterName, characterPath) {
            game.load.image(characterName, characterPath);
        };
        return CharacterLoader;
    })();
    CharacterModule.CharacterLoader = CharacterLoader;
    var Character = (function () {
        function Character(game, characterName, characterPath) {
            this.freezed = false;
            this.game = game;
        }
        Character.prototype.createCharacter = function (characterName, x, y, followCharacter) {
            this.character = this.game.add.sprite(x, y, characterName);
            this.character.scale.setTo(4, 4);
            this.game.physics.enable(this.character);
            this.character.body.bounce.y = 0.2;
            this.character.body.linearDamping = 1;
            this.character.body.collideWorldBounds = true;
            if (followCharacter == true) {
                this.game.camera.follow(this.character);
            }
        };
        Character.prototype.moveCharacter = function (x, y) {
            if (this.freezed == false) {
                this.newX = x;
                this.newY = y;
                this.game.physics.arcade.moveToXY(this.character, this.newX, this.newY, 600);
            }
        };
        Character.prototype.updateCharacter = function () {
            if (this.character.x >= this.newX && this.character.x < this.newX + 15) {
                this.character.body.velocity.x = 0;
            }
            if (this.character.y >= this.newY && this.character.y < this.newY + 15) {
                this.character.body.velocity.y = 0;
            }
        };
        Character.prototype.freezeCharacter = function () {
            //if(this.character.body.velocity.x != 0)
            //{
            //    this.character.body.velocity.setTo(0,0);
            //    //this.character.body.gravity.y = 0;
            //    this.freezed = true;
            //}
        };
        Character.prototype.unfreezeCharacter = function () {
            if (this.freezed == true) {
                //this.character.body.gravity.y = 400;
                this.game.physics.arcade.moveToXY(this.character, this.newX, this.newY, 600);
                this.freezed = false;
            }
        };
        return Character;
    })();
    CharacterModule.Character = Character;
})(CharacterModule || (CharacterModule = {}));
//# sourceMappingURL=Character.js.map