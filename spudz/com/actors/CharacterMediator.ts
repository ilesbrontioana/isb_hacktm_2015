/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterMediator extends MvcModule.Mediator{
        static NAME:string = "CharacterMediator";

        moveVO:ConnectionModule.MoveVO;

        constructor(viewComponent:MvcModule.View){

            super(CharacterMediator.NAME, viewComponent);

            this.initListeners();

        }

        initListeners()
        {
            this.addListenerToSignal("AttackOpponent", function(){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.TRY_DAMAGE, this.viewComponent.graphics);
            },this);

            this.addListenerToSignal("CharacterInfoToServer", function(){
                this.moveVO.ability = ""
                this.moveVO.destination = {x:this.viewComponent.graphics.x, y:this.viewComponent.graphics.y}
                this.moveVO.player_health =  (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterProxy).getLife();
                this.moveVO.player_pos = {x:this.viewComponent.graphics.x, y:this.viewComponent.graphics.y}
                this.dispatchSignal("move", this.moveVO);

            },this);

            this.addListenerToSignal("CharacterPosition", function(body:any){
                if(body.addActionRay == true)
                {
                    MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHARACTER_POSITION, body);
                }
                if(body.actionType == CharacterActionType.ATTACK)
                {
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.SHOW_ACTIONS_MENU);
                }
            }, this);

        }

        onRegister(){
            this.moveVO = new ConnectionModule.MoveVO();
            (this.viewComponent as CharacterView).createCharacter((MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenModule.SelectionScreenProxy.NAME) as SelectionScreenModule.SelectionScreenProxy).getSelection());
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.UPDATE_CHARACTER,
                CharacterModule.CharacterNotifications.GRID_TOUCHED,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterModule.CharacterNotifications.DAMAGE_COMPLETE,
                ConnectionModule.ConnectionSignals.YOUR_TURN,
                CharacterActionType.ATTACK];
        }

        handleNotification(notification:MvcModule.INotification) {
            MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.character = (this.viewComponent as CharacterView).graphics;

            switch (notification.name){
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as CharacterView).updateCharacter();
                    break;
                case CharacterModule.CharacterNotifications.GRID_TOUCHED:
                    (this.viewComponent as CharacterView).startAction(notification.body as Phaser.Sprite)
                    break;
                case CharacterModule.CharacterNotifications.TAKE_DAMAGE:
                    (this.viewComponent as CharacterView).animateTakeDamage(notification.body);
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.life);
                    break
                case CharacterModule.CharacterNotifications.DRAIN_ENERGY:
                        MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.energy);
                    break
                case CharacterActionType.ATTACK:
                    (this.viewComponent as CharacterView).setCharacterAttackAction(notification.body);
                    break;
                case ConnectionModule.ConnectionSignals.YOUR_TURN:
                    (this.viewComponent as CharacterView).characterTurn();
                    break;
                case CharacterModule.CharacterNotifications.DAMAGE_COMPLETE:
                    this.moveVO.ability = ""
                    this.moveVO.destination = new Phaser.Point((this.viewComponent as CharacterView).graphics.x,(this.viewComponent as CharacterView).graphics.y);
                    this.moveVO.player_health =  (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterProxy).getLife();
                    this.moveVO.player_pos = new Phaser.Point((this.viewComponent as CharacterView).graphics.x, (this.viewComponent as CharacterView).graphics.y);
                    this.moveVO.opponent_health = this.moveVO.opponent_health - notification.body;
                    this.dispatchSignal("move", this.moveVO);
                    break;
            }
        }
    }
}