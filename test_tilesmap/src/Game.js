/**
 * Created by ioanailes on 28/10/15.
 */
/// <reference path="com/isb/map/maploader.ts" />
/// <reference path="com/isb/sounds/soundsmanager.ts" />
var myGame;
window.onload = function () {
    myGame = new Game();
};
var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(3200, 2000, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    Game.prototype.preload = function () {
        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVeritcally = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
        this.mapLoader = new MapLoader.Map(this.game, 'assets/map/');
        this.mapLoader.loadMap('Tiles');
        this.soundManager = new SoundsModule.SoundsManager(this.game, 'assets/sounds/');
        this.soundManager.loadSounds();
        this.game.load.image('background', 'assets/background/bg1.jpg');
        this.game.load.image('character', 'assets/character/phaser-dude.png');
    };
    Game.prototype.create = function () {
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(4.5, 4.5);
        this.mapLoader.createMap('Tiles');
        this.mapLoader.createLayer('Tiles', 'TilesLayer');
        this.soundManager.createSounds();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.character = this.game.add.sprite(100, 1800, 'character');
        this.character.scale.setTo(4, 4);
        this.game.physics.enable(this.character);
        this.game.physics.arcade.gravity.y = 400;
        this.character.body.bounce.y = 0.2;
        this.character.body.linearDamping = 1;
        this.character.body.collideWorldBounds = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.camera.follow(this.character);
    };
    Game.prototype.update = function () {
        this.soundManager.playSound('sound2', 2000, true);
        this.game.physics.arcade.collide(this.character, MapLoader.Map.layers['Tiles']['TilesLayer']);
        this.character.body.velocity.x = 0;
        if (this.cursors.up.isDown) {
            this.soundManager.playSound('sound1', 0, false, true);
            this.character.body.velocity.y = -200;
        }
        if (this.cursors.left.isDown) {
            this.soundManager.pauseSound('sound2');
            this.character.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown) {
            this.soundManager.resumeSound('sound2');
            this.character.body.velocity.x = 150;
        }
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map