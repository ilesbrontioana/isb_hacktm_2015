/**
 * Created by ioanailes on 13/11/15.
 */
module RoundsModule
{
    export class StartMatchCommand extends MvcModule.Controller
    {
        static NAME:string = "StartMatchCommand";

        constructor()
        {
            super(StartMatchCommand.NAME);
        }

        public execute(notification:MvcModule.INotification)
        {
            MvcModule.Mvc.getInstance().registerMediator(BackgroundModule.BackgroundMediator.NAME, new BackgroundModule.BackgroundMediator(new BackgroundModule.BackgroundView()));

            MapModule.Map.getInstance().createMap('Spudz');
            MapModule.Map.getInstance().createLayer('Spudz', 'TilesLayer');
            MapModule.Map.getInstance().setLayerCollision('Spudz', 'TilesLayer', true, false, false, false);
            MapModule.Map.getInstance().createLayer('Spudz', 'Tiles2Layer');


            MvcModule.Mvc.getInstance().registerMediator(CharacterModule.ActionRayMediator.NAME, new CharacterModule.ActionRayMediator(new CharacterModule.ActionRayView()));

            MvcModule.Mvc.getInstance().registerMediator(GridModule.GridMediator.NAME, new GridModule.GridMediator(new GridModule.GridView()));

            MvcModule.Mvc.getInstance().registerMediator(CharacterModule.CharacterMediator.NAME, new CharacterModule.CharacterMediator(new CharacterModule.CharacterView()));
            MvcModule.Mvc.getInstance().registerMediator(CharacterModule.EnemyMediator.NAME, new CharacterModule.EnemyMediator(new CharacterModule.EnemyView()));
            MvcModule.Mvc.getInstance().registerProxy(CharacterModule.CharacterProxy.NAME, new CharacterModule.CharacterProxy());

            MapModule.Map.getInstance().createLayer('Spudz', 'Stuff');

            MvcModule.Mvc.getInstance().registerMediator(UserInterfaceModule.UIMediator.NAME, new UserInterfaceModule.UIMediator(new UserInterfaceModule.UIView()));
            MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.HIDE_ACTIONS_MENU);

            MvcModule.Mvc.getInstance().registerCommand(RoundsModule.RoundsCommand.NAME, new RoundsModule.RoundsCommand());
            MvcModule.Mvc.getInstance().registerMediator(RoundsModule.RoundsMediator.NAME, new RoundsModule.RoundsMediator(new RoundsModule.RoundsView()));
            MvcModule.Mvc.getInstance().registerProxy(RoundsModule.RoundsProxy.NAME, new RoundsModule.RoundsProxy());

            MvcModule.Mvc.getInstance().sendNotification(RoundsModule.RoundsNotifications.START_MATCH);
        }
    }
}