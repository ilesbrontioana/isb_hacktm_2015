/**
 * Created by ioanailes on 28/10/15.
 */
/// <reference path="com/isb/map/maploader.ts" />
/// <reference path="com/isb/sounds/soundsmanager.ts" />
/// <reference path="com/isb/grid/grid.ts" />
/// <reference path="com/isb/connection/connectionmodule.ts" />
/// <reference path="com/isb/character/character.ts" />
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
        CharacterModule.CharacterLoader.load(this.game, 'character', 'assets/character/phaser-dude.png');
        this.game.time.advancedTiming = true;
    };
    Game.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;
        this.background = this.game.add.image(0, 0, 'background');
        this.background.scale.setTo(4.5, 4.5);
        /*this.connection = new ConnectionModule.Connection(this.game);
        this.connection.init("ws://razvanpat.info.tm:8001/");*/
        this.mapLoader.createMap('Tiles');
        this.mapLoader.createLayer('Tiles', 'TilesLayer', true);
        this.character = new CharacterModule.Character(this.game);
        this.character.createCharacter('character', 800, 1800, true);
        this.grid = new GridModule.Grid(this.game, MapLoader.Map.grids['Tiles']);
        this.grid.signal.add(function (x, y) {
            this.character.moveCharacter(x, y);
            this.game.time.events.removeAll();
            this.game.time.events.add(Phaser.Timer.SECOND, function () {
                this.character.freezeCharacter();
                this.game.time.events.removeAll();
                this.game.time.events.add(Phaser.Timer.SECOND, function () {
                    this.character.unfreezeCharacter();
                    this.game.time.events.removeAll();
                }, this);
            }, this);
        }, this);
        this.soundManager.createSounds();
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.camera.follow(this.character);
    };
    Game.prototype.update = function () {
        this.game.physics.arcade.collide(this.character.character, MapLoader.Map.layers['Tiles']['TilesLayer']);
        this.character.updateCharacter();
    };
    Game.prototype.render = function () {
        this.game.debug.text(this.game.time.fps, 2, 14, "#ff0000");
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map