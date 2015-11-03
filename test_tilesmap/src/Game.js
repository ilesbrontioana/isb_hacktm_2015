/**
 * Created by ioanailes on 28/10/15.
 */
/// <reference path="com/isb/map/maploader.ts" />
/// <reference path="com/isb/sounds/soundsmanager.ts" />
/// <reference path="com/isb/grid/grid.ts" />
/// <reference path="com/isb/connection/connectionmodule.ts" />
var myGame;
window.onload = function () {
    myGame = new Game();
};
var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    Game.prototype.preload = function () {
        this.mapLoader = new MapLoader.Map(this.game, 'assets/map/');
        this.mapLoader.loadMap('Tiles');
        this.soundManager = new SoundsModule.SoundsManager(this.game, 'assets/sounds/');
        this.soundManager.loadSounds();
        this.game.load.image('background', 'assets/background/bg1.jpg');
        this.game.load.image('character', 'assets/character/phaser-dude.png');
        this.game.time.advancedTiming = true;
    };
    Game.prototype.create = function () {
        this.background = this.game.add.image(0, 0, 'background');
        this.background.scale.setTo(4.5, 4.5);
        /*this.connection = new ConnectionModule.Connection(this.game);
        this.connection.init("ws://razvanpat.info.tm:8001/");*/
        this.mapLoader.createMap('Tiles');
        this.mapLoader.createLayer('Tiles', 'TilesLayer', true);
        this.grid = new GridModule.Grid(this.game, MapLoader.Map.grids['Tiles']);
        this.grid.signal.add(function (tile) {
            this.character.x = tile.x;
            this.character.y = tile.y;
        }, this);
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
        this.game.physics.arcade.collide(this.character, MapLoader.Map.layers['Tiles']['TilesLayer']);
        this.character.body.velocity.x = 0;
        if (this.cursors.up.isDown) {
            this.character.body.velocity.y = -200;
        }
        if (this.cursors.down.isDown) {
            this.connection.terminate();
        }
        if (this.cursors.left.isDown) {
            this.character.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown) {
            this.character.body.velocity.x = 150;
        }
    };
    Game.prototype.render = function () {
        this.game.debug.text(this.game.time.fps, 2, 14, "#ff0000");
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map