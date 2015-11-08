/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterMediator extends MvcModule.Mediator{
        static NAME:string = this + "CharacterMediator";
        moveVO:ConnectionModule.MoveVO;

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
            EventsModule.SignalsManager.getInstance().createBinding("move", function(){},this);
            EventsModule.SignalsManager.getInstance().createBinding("CharacterPosition", function(body){

                if(body.addActionRay == true)
                {
                    MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHARACTER_POSITION, body);
                }
                if(body.actionType == CharacterActionType.MOVE)
                {
                    this.moveVO.ability = ""
                    this.moveVO.destination = {x:body.x, y:body.y}
                    this.moveVO.player_health =  MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME).getLife();
                    this.moveVO.player_pos = {x:body.x, y:body.y}
                    this.dispatchSignal("move", this.moveVO);
                } else{
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.SHOW_ACTIONS_MENU);
                }
            }, this);

            viewComponent.createCharacter('pirate');
        }

        onRegister(){
            this.moveVO = new ConnectionModule.MoveVO();
        }

        listNotificationInterests():Array{
            return [CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION,
                CharacterModule.CharacterNotifications.GRID_TOUCHED,
                CharacterModule.CharacterNotifications.BLOCK,
                CharacterModule.CharacterNotifications.MOVE,
                CharacterModule.CharacterNotifications.MELEE,
                CharacterModule.CharacterNotifications.RANGE,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterActionType.ATTACK,
                CharacterModule.CharacterNotifications.ULTIMATE];
        }

        handleNotification(notification:MvcModule.INotification) {
            MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.character = this.viewComponent.graphics;

            switch (notification.name){
                case CharacterModule.CharacterNotifications.CHECK_MAP_COLLISION:
                    this.viewComponent.checkCollision(notification.body)
                    this.viewComponent.updateCharacter();
                    break;
                case CharacterModule.CharacterNotifications.GRID_TOUCHED:
                    this.viewComponent.startAction(notification.body)
                    break;
                case CharacterModule.CharacterNotifications.BLOCK:
                    this.viewComponent.animateBlock(notification.body)
                    break
                case CharacterModule.CharacterNotifications.MOVE:
                    this.viewComponent.animateMove(notification.body)
                    break
                case CharacterModule.CharacterNotifications.MELEE:
                    this.viewComponent.animateMelee(notification.body)
                    break
                case CharacterModule.CharacterNotifications.RANGE:
                    this.viewComponent.animateRange(notification.body)
                    break
                case CharacterModule.CharacterNotifications.ULTIMATE:
                    this.viewComponent.animateUltimate(notification.body)
                    break
                case CharacterModule.CharacterNotifications.TAKE_DAMAGE:
                    this.viewComponent.animateTakeDamage(notification.body);
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.life);
                    break
                case CharacterModule.CharacterNotifications.DRAIN_ENERGY:
                        MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.energy);
                    break
                case CharacterActionType.ATTACK:
                        this.viewComponent.setCharacterAttackAction(notification.body);
                    break;
            }
        }
    }
}