/**
 * Created by ioanailes on 10/11/15.
 */
module LoadingModule
{
    import INotification = MvcModule.INotification;
    export class StartLoadingCommand extends MvcModule.Controller
    {
        static NAME:string = "StartLoadingCommand";

        public execute(notification:INotification) {

            SoundsModule.SoundsManager.getInstance().loadSounds();

            GraphicsModule.GraphicsManager.getInstance().loadAtlas('ui', 'ui/', 'UI SpriteSheet.png', 'UI SpriteSheet.json');
            GraphicsModule.GraphicsManager.getInstance().loadAtlas('pirate', 'character/pirate/', 'Spritesheet_Pirate.png', 'Spritesheet_Pirate.json');
            GraphicsModule.GraphicsManager.getInstance().loadAtlas('space', 'character/space/', 'Spritesheet_Space.png', 'Spritesheet_Space.json');
            GraphicsModule.GraphicsManager.getInstance().loadAtlas('bacon', 'character/bacon/', 'Spritesheet_Bacon.png', 'Spritesheet_Bacon.json');

            GraphicsModule.GraphicsManager.getInstance().loadMap('Spudz', 'map/');

            GraphicsModule.GraphicsManager.getInstance().loadBitmapFont('font', 'font/');

            GraphicsModule.GraphicsManager.getInstance().loadImage('background', 'background/', 'backgroud1.png');

            GraphicsModule.GraphicsManager.getInstance().loadImage('btnDefence', 'ui/', 'button_defence.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('btnMelee', 'ui/', 'button_melee.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('btnRange', 'ui/', 'button_range.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('btnSkip', 'ui/', 'button_skip.png');

            GraphicsModule.GraphicsManager.getInstance().loadImage('background_welcome_screen', 'selectionScreen/', 'Background.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('active_bacon', 'selectionScreen/', 'active_bacon.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('active_pirate', 'selectionScreen/', 'active_pirate.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('active_space', 'selectionScreen/', 'active_space.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('back_button', 'selectionScreen/', 'back_button.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('menu_bar', 'selectionScreen/', 'menu_bar.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('menu_button', 'selectionScreen/', 'menu_button.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('next_button', 'selectionScreen/', 'next_button.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('non-active_bacon', 'selectionScreen/', 'non-active_bacon.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('non-active_pirate', 'selectionScreen/', 'non-active_pirate.png');
            GraphicsModule.GraphicsManager.getInstance().loadImage('non-active_space', 'selectionScreen/', 'non-active_space.png');

           this.startLoading();
        }

        startLoading()
        {
            GraphicsModule.GraphicsManager.getInstance().game.load.onFileComplete.add(this.fileComplete, this);
            GraphicsModule.GraphicsManager.getInstance().game.load.onLoadComplete.add(this.loadComplete, this);
            GraphicsModule.GraphicsManager.getInstance().game.load.start();
        }

        fileComplete(progress, cacheKey, success, totalLoaded, totalFiles)
        {
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingNotifications.UPDATE_LOADING_PROGRESS, progress);
        }

        loadComplete()
        {
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingNotifications.LOADING_COMPLETE);
            MvcModule.Mvc.getInstance().sendNotification(LoadingModule.LoadingCompleteCommand.NAME);
        }

    }
}