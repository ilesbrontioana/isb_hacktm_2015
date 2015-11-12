/**
 * Created by ioanailes on 10/11/15.
 */
module LoadingModule
{
    import INotification = MvcModule.INotification;
    export class StartLoadingCommand extends MvcModule.Controller
    {
        static NAME:string = "StartLoadingCommand";

        constructor()
        {
            super(StartLoadingCommand.NAME);
        }

        public execute(notification:INotification) {

            SoundsModule.SoundsManager.getInstance().loadSounds();

            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadAtlas('ui', 'ui/', 'UI SpriteSheet.png', 'UI SpriteSheet.json');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadAtlas('pirate', 'character/pirate/', 'Spritesheet_Pirate.png', 'Spritesheet_Pirate.json');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadAtlas('space', 'character/space/', 'Spritesheet_Space.png', 'Spritesheet_Space.json');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadAtlas('bacon', 'character/bacon/', 'Spritesheet_Bacon.png', 'Spritesheet_Bacon.json');

            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadMap('Spudz', 'map/');

            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadBitmapFont('font', 'font/');

            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('background', 'background/', 'backgroud1.png');

            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('btnDefence', 'ui/', 'button_defence.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('btnMelee', 'ui/', 'button_melee.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('btnRange', 'ui/', 'button_range.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('btnSkip', 'ui/', 'button_skip.png');

            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('background_welcome_screen', 'selectionScreen/', 'Background.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('active_bacon', 'selectionScreen/', 'active_bacon.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('active_pirate', 'selectionScreen/', 'active_pirate.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('active_space', 'selectionScreen/', 'active_space.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('back_button', 'selectionScreen/', 'back_button.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('menu_bar', 'selectionScreen/', 'menu_bar.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('menu_button', 'selectionScreen/', 'menu_button.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('next_button', 'selectionScreen/', 'next_button.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('non-active_bacon', 'selectionScreen/', 'non-active_bacon.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('non-active_pirate', 'selectionScreen/', 'non-active_pirate.png');
            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).loadImage('non-active_space', 'selectionScreen/', 'non-active_space.png');

            (MvcModule.Mvc.getInstance().retrieveProxy(LoadingProxy.NAME) as LoadingProxy).startLoading();
        }

    }
}