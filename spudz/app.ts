/**
 * Created by adm on 12.10.15.
 */
/// <reference path="phaser.d.ts" />
/// <reference path="com/MVC/MVC.ts" />
/// <reference path="com/managers/events/SignalsManager.ts" />
/// <reference path="com/managers/game/GameController.ts" />
/// <reference path="com/managers/map/MapLoader.ts" />
/// <reference path="com/managers/sounds/SoundsManager.ts" />
/// <reference path="com/managers/graphics/GraphicsManager.ts" />
/// <reference path="com/ui/UIMediator.ts" />
/// <reference path="com/ui/UIView.ts" />
/// <reference path="com/actors/CharacterMediator.ts" />
/// <reference path="com/actors/CharacterView.ts" />
/// <reference path="com/actors/CharacterNotifications.ts" />
/// <reference path="com/grid/GridMediator.ts" />
/// <reference path="com/grid/GridView.ts" />
/// <reference path="com/grid/GridNotifications.ts" />

class SimpleGame {
    game: Phaser.Game;
    map:MapModule.Map;
    background;
    hud;

    constructor() {
        this.game = new Phaser.Game(2000, 1400, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            render: this.render,
            update: this.update,
            onStartup:this.onStartup
        });
    }

    preload() {
        GameControllerModule.GameController.getInstance().game = this.game;
        GraphicsModule.GraphicsManager.getInstance().loadAtlas("ui", "../../spudz/bin/assets/ui/", 'UI SpriteSheet.png', 'UI SpriteSheet.json');

        this.game.load.image('bg', '../../spudz/bin/assets/background/bg1.jpg');
        this.game.load.image('pirate_test', '../../spudz/bin/assets/character/pirate_test.png');

        this.map = new MapModule.Map();
        this.map.loadMap('Spudz');

        SoundsModule.SoundsManager.getInstance().loadSounds();
    }
    render() {

    }

    update() {
        MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION, MapModule.Map.layers['Spudz']['TilesLayer']);
        // Mouse Poll
        if (this.game.input.activePointer.isDown) {
            GameControllerModule.GameController.getInstance().inputOngoing = true;
        }
        else{
            GameControllerModule.GameController.getInstance().inputOngoing = false;
        }
    }

    create() {
        this.background = this.game.add.image(0,0,'bg');
        this.background.scale.setTo(4.5, 4.5);

        EventsModule.SignalsManager.getInstance().scope = this;
        SoundsModule.SoundsManager.getInstance().createSounds();

        this.map.createMap('Spudz');
        this.map.createLayer('Spudz', 'TilesLayer', true);
        this.map.setLayerCollision('Spudz', 'TilesLayer', true, false, false, false);

        this.onStartup();

        //MvcModule.Mvc.getInstance().registerMediator(CharacterModule.CharacterMediator.NAME, new CharacterModule.CharacterMediator(new CharacterModule.CharacterView()));


        //var grid:GridModule.Grid = new GridModule.Grid(0, 0, 32, 20, 80, 80);

        //this.cursors = this.game.input.keyboard.createCursorKeys();

        //this.character.createCharacter('pirate_test', 560, 1120, true);

        //grid.addActionRayAt(this.character.graphics.x + this.character.graphics.width/2, this.character.graphics.y + this.character.graphics.height/2, 8);

        SoundsModule.SoundsManager.getInstance().playSound('sound3');

        //CHARACTER


        //USER INTERFACE

    }

    onStartup() {
        var startUpCommand:MvcModule.Controller = new MvcModule.Controller();
        MvcModule.Mvc.getInstance().registerCommand("Startup", startUpCommand);

        MvcModule.Mvc.getInstance().registerMediator("StartupMediator",new StartupMediator(new testView()));
        MvcModule.Mvc.getInstance().registerProxy("TestProxy", new testProxy());

        MvcModule.Mvc.getInstance().sendNotification("Startup",1, "test");
    }
}

window.onload = () => {
    var game = new SimpleGame();
};

/////////////////////////////////////////////////////////////////////
class testView extends MvcModule.View{
    constructor(){


    }
}

class StartupMediator extends MvcModule.Mediator{
    constructor(viewComponent:MvcModule.View){
        super(viewComponent);
    }

    listNotificationInterests():Array{
        return ["Startup"];
    }

    handleNotification(notification:MvcModule.INotification){

        MvcModule.Mvc.getInstance().registerMediator(GridModule.GridMediator.NAME, new GridModule.GridMediator(new GridModule.GridView()));
        MvcModule.Mvc.getInstance().registerMediator(CharacterModule.CharacterMediator.NAME, new CharacterModule.CharacterMediator(new CharacterModule.CharacterView()));

        MvcModule.Mvc.getInstance().registerMediator(UserInterfaceModule.UIMediator.NAME, new UserInterfaceModule.UIMediator(new UserInterfaceModule.UIView()));
        MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.HIDE_ACTIONS_MENU);
    }
}

class testProxy extends MvcModule.Proxy{
    constructor(){
        this.sendNotification("TestProxy", 2)
    }
}

