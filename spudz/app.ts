/**
 * Created by adm on 12.10.15.
 */
/// <reference path="phaser.d.ts" />
/// <reference path="com/managers/events/SignalsManager.ts" />
/// <reference path="com/grid/Grid.ts" />
/// <reference path="com/managers/game/GameController.ts" />

class SimpleGame {
    game: Phaser.Game;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    player: Phaser.Sprite;
    cursors;

    constructor() {
        this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
            create: this.create, preload: this.preload, render: this.render, update: this.update
        });

        //REGISTER SIGNALS
        EventsModule.SignalsManager.getInstance().createBinding("test", this.onTest1, this);
        EventsModule.SignalsManager.getInstance().createBinding("test", this.onTest2, this);
    }

    preload() {
        this.game.load.image("phaser-dude", "assets/spudz/placeHolder/character/phaser-dude.png");
    }
    render() {

    }

    update() {

    }

    create() {
        GameControllerModule.GameController.getInstance().game = this.game;
        EventsModule.SignalsManager.getInstance().scope = this;

        var grid:GridModule.Grid = new GridModule.Grid(this.game, 0, 0, 20, 20, 50, 50);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.stage.backgroundColor = '#787878';

        this.player = new Phaser.Sprite(this.game, 100,50, "phaser-dude");
        this.game.world.add(this.player);

        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 100;
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);
    }

    public onTest1(test) {
        console.log("ON TEST 1    "+this+" !?!?!?!?! "+test);
    }

    onTest2() {
        console.log("ON TEST 2    "+this.player);
    }
}

window.onload = () => {
    var game = new SimpleGame();
};

