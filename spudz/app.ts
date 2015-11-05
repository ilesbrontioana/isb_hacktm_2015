/**
 * Created by adm on 12.10.15.
 */
/// <reference path="phaser.d.ts" />
/// <reference path="com/MVC/MVC.ts" />
/// <reference path="com/managers/events/SignalsManager.ts" />
/// <reference path="com/grid/Grid.ts" />
/// <reference path="com/managers/game/GameController.ts" />
/// <reference path="com/managers/map/MapLoader.ts" />
/// <reference path="com/managers/sounds/SoundsManager.ts" />
/// <reference path="com/actors/Character.ts" />
/// <reference path="com/ui/UI.ts" />
/// <reference path="com/managers/graphics/GraphicsManager.ts" />

class SimpleGame {
    game: Phaser.Game;
    cursors;
    map:MapModule.Map;
    character:CharacterModule.Character;
    background;
    hud;

    constructor() {
        this.game = new Phaser.Game(1336, 740, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            render: this.render,
            update: this.update,
            onTestMVC:this.onTestMVC,
            onTest2:this.onTest2
        });
    }

    preload() {
        this.onTestMVC();

        GameControllerModule.GameController.getInstance().game = this.game;
        GraphicsModule.GraphicsManager.getInstance().loadAtlas("ui", "../../spudz/bin/assets/ui/", 'UI SpriteSheet.png', 'UI SpriteSheet.json');

        this.game.load.image('bg', '../../spudz/bin/assets/background/Background3.jpg');

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

        this.hud = new UserInterfaceModule.hud();
    }

    onTestMVC() {
        var startUpCommand:MvcModule.Controller = new MvcModule.Controller();
        MvcModule.Mvc.getInstance().registerCommand("Startup", startUpCommand);

        MvcModule.Mvc.getInstance().registerMediator("TestMediator",new testMediator(new testView()));
        MvcModule.Mvc.getInstance().registerProxy("TestProxy", new testProxy());

        MvcModule.Mvc.getInstance().sendNotification("Startup",1, "test");
    }

    onTest2(tile) {
        this.character.moveCharacter(tile.x, tile.y)
        console.log("ON TEST 2    ");
    }
}

window.onload = () => {
    var game = new SimpleGame();
};

//////////////////////////////////////////////////////
class testView extends MvcModule.View{
    constructor(){
        console.log("za test view")
    }
}

class testMediator extends MvcModule.Mediator{
    constructor(viewComponent:MvcModule.View){
        super(viewComponent);
    }

    listNotificationInterests():Array{
        return ["Startup", "TestProxy"];
    }

    handleNotification(notification:MvcModule.INotification){
        console.log(notification.name+" "+notification.body);
    }
}

class testProxy extends MvcModule.Proxy{
    constructor(){
        this.sendNotification("TestProxy", 2)
    }
}

