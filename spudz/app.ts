/**
 * Created by adm on 12.10.15.
 */
/// <reference path="phaser.d.ts" />

/// <reference path="com/MVC/MVC.ts" />

/// <reference path="com/managers/events/SignalsManager.ts" />
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

/// <reference path="com/loading/LoadingView.ts" />
/// <reference path="com/loading/LoadingMediator.ts" />
/// <reference path="com/loading/LoadingNotifications.ts" />
/// <reference path="com/loading/StartLoadingCommand.ts" />
/// <reference path="com/loading/LoadingCompleteCommand.ts" />
/// <reference path="com/loading/LoadingProxy.ts" />
/// <reference path="com/loading/IAbstractLoader.ts" />
/// <reference path="com/loading/PhaserLoader.ts" />

/// <reference path="com/background/BackgroundMediator.ts" />
/// <reference path="com/background/BackgroundView.ts" />

class SimpleGame {
    game: Phaser.Game;
    map:MapModule.Map;
    background:Phaser.Image;
    loader:LoadingModule.IAbstractLoader;

    constructor() {

        this.game = new Phaser.Game(1334, 740, Phaser.AUTO, 'content', {
            create: this.create,
            preload: this.preload,
            render: this.render,
            update: this.update,
        });
    }

    preload() {

        GraphicsModule.GraphicsManager.getInstance().game = this.game;
        this.loader = new LoadingModule.PhaserLoader();

        this.game.load.image('loadingScreen', '../../spudz/bin/assets/loading/Loading.jpg');
    }

    create() {

        MvcModule.Mvc.getInstance().registerMediator(LoadingModule.LoadingMediator.NAME, new LoadingModule.LoadingMediator(new LoadingModule.LoadingView()));

        MvcModule.Mvc.getInstance().registerProxy(LoadingModule.LoadingProxy.NAME, new LoadingModule.LoadingProxy(this.loader));

        MvcModule.Mvc.getInstance().registerCommand(LoadingModule.StartLoadingCommand.NAME, new LoadingModule.StartLoadingCommand());
        MvcModule.Mvc.getInstance().registerCommand(LoadingModule.LoadingCompleteCommand.NAME, new LoadingModule.LoadingCompleteCommand());

        MvcModule.Mvc.getInstance().sendNotification(LoadingModule.StartLoadingCommand.NAME);
    }


    render() {

    }

    update() {
        if( MapModule.Map.getInstance().layers['Spudz'])
        {
            MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION,
                [
                    MapModule.Map.getInstance().layers['Spudz']['Tiles2Layer'],
                    MapModule.Map.getInstance().layers['Spudz']['TilesLayer']
                ]);
        }
    }
}

window.onload = () => {
    var game = new SimpleGame();
};

