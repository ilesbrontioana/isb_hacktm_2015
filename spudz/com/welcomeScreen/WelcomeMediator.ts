/**
 * Created by adm on 07.11.15.
 */
module WelcomeModule{
    export class WelcomeMediator extends MvcModule.Mediator{
        static NAME:string = this+"WelcomeMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
            this.addListenerToSignal("StartGame", function(){
                MvcModule.Mvc.getInstance().registerMediator(CharacterModule.ActionRayMediator.NAME, new CharacterModule.ActionRayMediator(new CharacterModule.ActionRayView()));

                MvcModule.Mvc.getInstance().registerMediator(GridModule.GridMediator.NAME, new GridModule.GridMediator(new GridModule.GridView()));

                MvcModule.Mvc.getInstance().registerMediator(CharacterModule.CharacterMediator.NAME, new CharacterModule.CharacterMediator(new CharacterModule.CharacterView()));
                MvcModule.Mvc.getInstance().registerProxy(CharacterModule.CharacterProxy.NAME, new CharacterModule.CharacterProxy());

                MvcModule.Mvc.getInstance().registerMediator(UserInterfaceModule.UIMediator.NAME, new UserInterfaceModule.UIMediator(new UserInterfaceModule.UIView()));
                MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.HIDE_ACTIONS_MENU);

                MvcModule.Mvc.getInstance().registerCommand(RoundsModule.RoundsCommand.NAME, new RoundsModule.RoundsCommand());
                MvcModule.Mvc.getInstance().registerMediator(RoundsModule.RoundsMediator.NAME, new RoundsModule.RoundsMediator(new RoundsModule.RoundsView()));
                MvcModule.Mvc.getInstance().registerProxy(RoundsModule.RoundsProxy.NAME, new RoundsModule.RoundsProxy());


            });
        }

        listNotificationInterests():Array{
            return [WelcomeModule.WelcomeNotifications.WELCOME];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name) {

            }
        }
    }
}