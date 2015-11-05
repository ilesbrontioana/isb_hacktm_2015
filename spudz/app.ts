/**
 * Created by adm on 12.10.15.
 */
/// <reference path="phaser.d.ts" />
/// <reference path="com/managers/events/SignalsManager.ts" />
/// <reference path="com/grid/Grid.ts" />
/// <reference path="com/managers/game/GameController.ts" />
/// <reference path="com/managers/map/MapLoader.ts" />
/// <reference path="com/managers/sounds/SoundsManager.ts" />
/// <reference path="com/actors/Character.ts" />

class SimpleGame {
    game: Phaser.Game;
    cursors;
    map:MapModule.Map;
    character:CharacterModule.Character;
    background;

    constructor() {
        this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            render: this.render,
            update: this.update,
            //onTest1:this.onTest1,
            onTest2:this.onTest2
        });
    }

    preload() {

        GameControllerModule.GameController.getInstance().game = this.game;

        this.game.load.image('bg', '../../spudz/bin/assets/background/bg1.jpg');

        this.character = new CharacterModule.Character();
        this.character.load('phaser-dude');

        this.map = new MapModule.Map();
        this.map.loadMap('Tiles');

        SoundsModule.SoundsManager.getInstance().loadSounds();
    }
    render() {

    }

    update() {
        this.game.physics.arcade.collide(this.character.characterImage, MapModule.Map.layers['Tiles']['TilesLayer']);
        this.character.updateCharacter();
    }

    create() {
        //REGISTER SIGNALS
        //EventsModule.SignalsManager.getInstance().createBinding("test", this.onTest1, this);
        EventsModule.SignalsManager.getInstance().createBinding("test", this.onTest2, this);

        EventsModule.SignalsManager.getInstance().scope = this;

        SoundsModule.SoundsManager.getInstance().createSounds();

        //this.game.stage.backgroundColor = '#787878';
        this.background = this.game.add.image(0,0,'bg');
        this.background.scale.setTo(4.5, 4.5);

        this.map.createMap('Tiles');
        this.map.createLayer('Tiles', 'TilesLayer', true);

        var grid:GridModule.Grid = new GridModule.Grid(this.game, 0, 0, 100, 100, 32, 20);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.character.createCharacter('phaser-dude', 150, 50, true);

        SoundsModule.SoundsManager.getInstance().playSound('sound3');

    }

    onTest1(tile) {
        console.log("ON TEST 1    "+this+" !?!?!?!?! "+test);
    }

    onTest2(tile) {
        this.character.moveCharacter(tile.x, tile.y)
        console.log("ON TEST 2    ");
    }
}

window.onload = () => {
    var game = new SimpleGame();
};

