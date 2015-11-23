/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterMediator extends MvcModule.Mediator{
        static NAME:string = "CharacterMediator";

        moveVO:ConnectionModule.MoveVO;

        characterProxy:CharacterModule.CharacterProxy;
        enemyProxy:CharacterModule.EnemyProxy;

        constructor(viewComponent:MvcModule.View){

            super(CharacterMediator.NAME, viewComponent);

        }

        onRegister(){

            this.initListeners();
            this.moveVO = new ConnectionModule.MoveVO();

            this.characterProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterModule.CharacterProxy);
            this.characterProxy.setCharacterName((MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenModule.SelectionScreenProxy.NAME) as SelectionScreenModule.SelectionScreenProxy).getSelection());

            var x = 680;
            var y = 1244;
            (this.viewComponent as CharacterView).createCharacter(this.characterProxy.getCharacterName(), x, y, true);

            this.characterProxy.setCharacter((this.viewComponent as CharacterView).graphics);

            this.enemyProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.EnemyProxy.NAME) as CharacterModule.EnemyProxy);

        }

        initListeners()
        {
            this.addListenerToSignal("AttackOpponent", function(){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.ATTACK_ENEMY,
                        this.characterProxy.getActionRay());
            },this);

            this.addListenerToSignal("CharacterInfoToServer", function(){
                this.updateCharacterVO();
                this.dispatchSignal(ConnectionModule.ConnectionSignals.MOVE, this.getMoveVO());

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

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.UPDATE_CHARACTER,
                CharacterModule.CharacterNotifications.GRID_TOUCHED,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterModule.CharacterNotifications.ATTACK_COMPLETE,
                ConnectionModule.ConnectionSignals.YOUR_TURN,
                CharacterActionType.ATTACK];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as CharacterView).updateCharacter();
                    break;
                case CharacterModule.CharacterNotifications.GRID_TOUCHED:
                    var tile:Phaser.Sprite = notification.body as Phaser.Sprite;
                    (this.viewComponent as CharacterView).startMoving(tile.x, tile.y, tile.width, tile.height)
                    break;
                case CharacterModule.CharacterNotifications.TAKE_DAMAGE:
                    (this.viewComponent as CharacterView).animateTakeDamage(notification.body);
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.life);
                    break;
                case CharacterModule.CharacterNotifications.DRAIN_ENERGY:
                        MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                        MvcModule.Mvc.getInstance().retrieveProxy(CharacterProxy.NAME).VO.energy);
                    break;
                case CharacterActionType.ATTACK:
                    (this.viewComponent as CharacterView).setCharacterAttackAction(notification.body);
                    break;
                case ConnectionModule.ConnectionSignals.YOUR_TURN:
                    (this.viewComponent as CharacterView).characterTurn();
                    break;
                case CharacterModule.CharacterNotifications.ATTACK_COMPLETE:
                    this.updateCharacterVO();
                    this.dispatchSignal(ConnectionModule.ConnectionSignals.MOVE, this.getMoveVO());
                    break;
            }
        }

        updateCharacterVO()
        {
            this.characterProxy.setEnergy(this.characterProxy.getEnergy() - 5);
            this.characterProxy.setAbility((this.viewComponent as CharacterView).attackAction);
        }

        getMoveVO():ConnectionModule.MoveVO
        {
            this.moveVO.ability = this.characterProxy.getAbility();
            this.moveVO.destination = this.characterProxy.getCharacter().position;
            this.moveVO.player_pos = this.characterProxy.getCharacter().position;
            this.moveVO.player_energy = this.characterProxy.getEnergy();
            this.moveVO.player_health = this.characterProxy.getLife();
            this.moveVO.opponent_energy = this.enemyProxy.getEnergy();
            this.moveVO.opponent_health = this.enemyProxy.getLife();
            this.moveVO.opponent_pos = this.enemyProxy.getCharacter().position;

            return this.moveVO;
        }
    }
}