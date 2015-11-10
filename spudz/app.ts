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
/// <reference path="com/actors/EnemyMediator.ts" />
/// <reference path="com/actors/EnemyView.ts" />

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

    /// <reference path="com/selectionScreen/SelectionScreenMediator.ts" />
/// <reference path="com/selectionScreen/SelectionScreenNotifications.ts" />
/// <reference path="com/selectionScreen/SelectionScreenView.ts" />
/// <reference path="com/selectionScreen/SelectionScreenProxy.ts" />
/// <reference path="com/selectionScreen/SelectionScreenVO.ts" />

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
    background:Phaser.Image;

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
        GraphicsModule.GraphicsManager.getInstance().loadAtlas("bacon", "../../spudz/bin/assets/character/bacon/", 'Spritesheet_Bacon.png', 'Spritesheet_Bacon.json');

        this.game.load.bitmapFont('font', '../../spudz/bin/assets/font/font.png', '../../spudz/bin/assets/font/font.fnt');
        this.game.load.image('bg', '../../spudz/bin/assets/background/backgroud1.png');

        this.game.load.image('btnDefence', '../../spudz/bin/assets/ui/button_defence.png');
        this.game.load.image('btnMelee', '../../spudz/bin/assets/ui/button_melee.png');
        this.game.load.image('btnRange', '../../spudz/bin/assets/ui/button_range.png');
        this.game.load.image('btnSkip', '../../spudz/bin/assets/ui/button_skip.png');

        this.game.load.image('background_welcome_screen', '../../spudz/bin/assets/selectionScreen/Background.png');
        this.game.load.image('active_bacon', '../../spudz/bin/assets/selectionScreen/active_bacon.png');
        this.game.load.image('active_pirate', '../../spudz/bin/assets/selectionScreen/active_pirate.png');
        this.game.load.image('active_space', '../../spudz/bin/assets/selectionScreen/active_space.png');
        this.game.load.image('back_button', '../../spudz/bin/assets/selectionScreen/back_button.png');
        this.game.load.image('menu_bar', '../../spudz/bin/assets/selectionScreen/menu_bar.png');
        this.game.load.image('menu_button', '../../spudz/bin/assets/selectionScreen/menu_button.png');
        this.game.load.image('next_button', '../../spudz/bin/assets/selectionScreen/next_button.png');
        this.game.load.image('non-active_bacon', '../../spudz/bin/assets/selectionScreen/non-active_bacon.png');
        this.game.load.image('non-active_pirate', '../../spudz/bin/assets/selectionScreen/non-active_pirate.png');
        this.game.load.image('non-active_space', '../../spudz/bin/assets/selectionScreen/non-active_space.png');

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
    }

    create() {
        this.background = this.game.add.image(0,0,'bg');
        this.background.scale.setTo(1, 1);

        EventsModule.SignalsManager.getInstance().scope = this;
        SoundsModule.SoundsManager.getInstance().createSounds();

        this.map.createMap('Spudz');
        this.map.createLayer('Spudz', 'TilesLayer');
        this.map.setLayerCollision('Spudz', 'TilesLayer', true, false, false, false);
        this.map.createLayer('Spudz', 'Tiles2Layer');

        //new ConnectionModule.ConnectionProxy(new WebSocket("ws://192.168.8.2:8001/"));

        this.map.createLayer('Spudz', 'Stuff');

        this.onStartup();

        SoundsModule.SoundsManager.getInstance().playSound('ambiance', 0, true);

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

///////////////////////////////////////////////////////////////////////////
class testView extends MvcModule.View{
    constructor(){
        super();

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
        //MvcModule.Mvc.getInstance().registerMediator(WelcomeModule.WelcomeMediator.NAME, new WelcomeModule.WelcomeMediator(new WelcomeModule.WelcomeView()));
        MvcModule.Mvc.getInstance().registerMediator(SelectionScreenModule.SelectionScreenMediator.NAME, new SelectionScreenModule.SelectionScreenMediator(new SelectionScreenModule.SelectionScreenView()));
         MvcModule.Mvc.getInstance().registerProxy(SelectionScreenModule.SelectionScreenProxy.NAME, new SelectionScreenModule.SelectionScreenProxy());
    }
}

class testProxy extends MvcModule.Proxy{
    constructor(){
        super();
        this.sendNotification("TestProxy", 2)
    }
}

