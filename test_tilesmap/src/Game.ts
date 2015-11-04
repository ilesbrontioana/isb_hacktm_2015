/**
 * Created by ioanailes on 28/10/15.
 */
/// <reference path="com/isb/map/maploader.ts" />
/// <reference path="com/isb/sounds/soundsmanager.ts" />
/// <reference path="com/isb/grid/grid.ts" />
/// <reference path="com/isb/connection/connectionmodule.ts" />
/// <reference path="com/isb/character/character.ts" />
/// <reference path="com/isb/events/SignalsManager.ts" />

var myGame;
window.onload = () => {

    myGame = new Game();

};

class Game {

    game;
    mapLoader;
    soundManager;
    grid;
    connection;

    background;
    character;
    cursors;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }

    preload()
    {
        this.mapLoader = new MapLoader.Map(this.game, 'assets/map/');
        this.mapLoader.loadMap('Tiles');

        this.soundManager = new SoundsModule.SoundsManager(this.game, 'assets/sounds/');
        this.soundManager.loadSounds();

        this.game.load.image('background', 'assets/background/bg1.jpg');

        this.character = new CharacterModule.Character(this.game);
        this.character.load('character', 'assets/character/phaser-dude.png');

        this.game.time.advancedTiming = true;
    }

    create()
    {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;

        this.background = this.game.add.image(0, 0, 'background');
        this.background.scale.setTo(4.5,4.5);

        this.mapLoader.createMap('Tiles');
        this.mapLoader.createLayer('Tiles', 'TilesLayer', true);

        this.character.createCharacter('character', 800, 1800, true);

        this.connection = new ConnectionModule.Connection(new WebSocket('ws://razvanpat.info.tm:8001/'));

        this.grid = new GridModule.Grid(this.game, MapLoader.Map.grids['Tiles']);
        this.grid.signal.add(
                function(x, y)
                {
                    this.character.moveCharacter(x, y);
                    this.game.time.events.removeAll();
                    this.game.time.events.add(Phaser.Timer.SECOND, function(){
                        this.character.freezeCharacter();
                        this.game.time.events.removeAll();
                        this.game.time.events.add(Phaser.Timer.SECOND, function(){
                            this.character.unfreezeCharacter();
                            this.game.time.events.removeAll();
                        }, this);
                    }, this);
                },
                this);

        this.soundManager.createSounds();

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update()
    {
        this.game.physics.arcade.collide(this.character.character, MapLoader.Map.layers['Tiles']['TilesLayer']);
        this.character.updateCharacter();
    }

    render()
    {
        this.game.debug.text(this.game.time.fps, 2, 14, "#ff0000");
    }
}
