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
/// <reference path="com/actors/CharacterAnimations.ts" />
/// <reference path="com/actors/CharacterProxy.ts" />
/// <reference path="com/actors/CharacterVO.ts" />

/// <reference path="com/grid/GridMediator.ts" />
/// <reference path="com/grid/GridView.ts" />
/// <reference path="com/grid/GridNotifications.ts" />

/// <reference path="com/rounds/RoundsController.ts" />
/// <reference path="com/rounds/RoundsMediator.ts" />
/// <reference path="com/rounds/RoundsProxy.ts" />
/// <reference path="com/rounds/RoundsView.ts" />
/// <reference path="com/rounds/RoundsVO.ts" />
/// <reference path="com/rounds/RoundsNotifications.ts" />

/// <reference path="com/welcomeScreen/WelcomeMediator.ts" />
/// <reference path="com/welcomeScreen/WelcomeNotifications.ts" />
/// <reference path="com/welcomeScreen/WelcomeView.ts" />

/// <reference path="com/actors/CharacterActionType.ts" />
/// <reference path="com/actors/ActionRayView.ts" />
/// <reference path="com/actors/ActionRayMediator.ts" />

/// <reference path="com/managers/connection/ConnectionModule.ts" />
/// <reference path="com/managers/connection/ConnectionNotifications.ts" />
/// <reference path="com/managers/connection/ConnectionSignals.ts" />
/// <reference path="com/managers/connection/MoveVO.ts" />

class SimpleGame {
    game: Phaser.Game;
    map:MapModule.Map;
    background;
    hud;

    constructor() {

        this.game = new Phaser.Game(1334, 740, Phaser.AUTO, 'content', {
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
        GraphicsModule.GraphicsManager.getInstance().loadAtlas("pirate", "../../spudz/bin/assets/character/pirate/", 'Spritesheet_Pirate.png', 'Spritesheet_Pirate.json');
        GraphicsModule.GraphicsManager.getInstance().loadAtlas("space", "../../spudz/bin/assets/character/space/", 'Spritesheet_Space.png', 'Spritesheet_Space.json');

        this.game.load.bitmapFont('font', '../../spudz/bin/assets/font/font.png', '../../spudz/bin/assets/font/font.fnt');
        this.game.load.image('bg', '../../spudz/bin/assets/background/bg1.jpg');
        //this.game.load.image('pirate_test', '../../spudz/bin/assets/character/pirate_test.png');

        this.map = new MapModule.Map();
        this.map.loadMap('Spudz');

        SoundsModule.SoundsManager.getInstance().loadSounds();
    }
    render() {

    }

    update() {
        MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION,
                [
                    MapModule.Map.layers['Spudz']['Tiles2Layer'],
                    MapModule.Map.layers['Spudz']['TilesLayer']
                ]);
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
        this.map.createLayer('Spudz', 'TilesLayer');
        this.map.setLayerCollision('Spudz', 'TilesLayer', true, false, false, false);
        this.map.createLayer('Spudz', 'Tiles2Layer');
        this.map.createLayer('Spudz', 'Stuff');

        this.onStartup();

        SoundsModule.SoundsManager.getInstance().playSound('sound3');
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

////////////////////////////////////////////////////////////////////////
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
        MvcModule.Mvc.getInstance().registerMediator(WelcomeModule.WelcomeMediator.NAME, new WelcomeModule.WelcomeMediator(new WelcomeModule.WelcomeView()));
    }
}

class testProxy extends MvcModule.Proxy{
    constructor(){
        this.sendNotification("TestProxy", 2)
    }
}

