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

        characterTurn:boolean;

        constructor(viewComponent:MvcModule.View){

            super(CharacterMediator.NAME, viewComponent);

        }

        onRegister(){

            this.initListeners();
            this.moveVO = new ConnectionModule.MoveVO();

            this.characterProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterModule.CharacterProxy);
            this.characterProxy.setCharacterName((MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenModule.SelectionScreenProxy.NAME) as SelectionScreenModule.SelectionScreenProxy).getSelection());

            var x = 680;
            var y = 1255;
            (this.viewComponent as CharacterView).createCharacter(this.characterProxy.getCharacterName(), x, y);

            this.characterProxy.setCharacter((this.viewComponent as CharacterView).graphics);

            this.enemyProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.EnemyProxy.NAME) as CharacterModule.EnemyProxy);

            this.sendNotification(CameraModule.CameraNotifications.SET_CAMERA_POSITION, {x:1000, y: 1255});

        }

        initListeners()
        {
            this.addListenerToSignal("AttackOpponent", function(){
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.ATTACK_ENEMY);
            },this);

            this.addListenerToSignal("SendMoveToServer", function(){
                this.dispatchSignal(ConnectionModule.ConnectionSignals.MOVE, this.getMoveVO());

            },this);

            this.addListenerToSignal("CharacterDamageComplete", function(){
                this.dispatchSignal(ConnectionModule.ConnectionSignals.OPPONENT_MOVE_COMPLETE);
            },this);

            this.addListenerToSignal("CharacterPosition", function(body:any){

                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.CHARACTER_POSITION, body);
                if(body.actionType == CharacterActionType.ATTACK)
                {
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.SHOW_ACTIONS_MENU);
                    this.enemyInActionRay();
                }
                else if(body.actionType == CharacterActionType.MOVE)
                {
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.SHOW_MOVE_MENU);
                }
            }, this);

        }

        enemyInActionRay()
        {
            var distance = GraphicsModule.GraphicsManager.getInstance().game.physics.arcade.distanceBetween(
                this.characterProxy.getCharacter(), this.enemyProxy.getCharacter());
            if(distance > CharacterModule.ActionRayView.MELEE_RAY * GridModule.GridView.tileWidth - this.enemyProxy.getCharacter().width/2)
            {
                MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.DISABLE_MELEE_ACTION_BUTTON);
            }
            if(distance > CharacterModule.ActionRayView.RANGE_RAY * GridModule.GridView.tileWidth - this.enemyProxy.getCharacter().width/2)
            {
                MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.DISABLE_RANGE_ACTION_BUTTON);
            }
        }

        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.UPDATE_CHARACTER,
                CharacterModule.CharacterNotifications.GRID_TOUCHED,
                CharacterModule.CharacterNotifications.TAKE_DAMAGE,
                CharacterModule.CharacterNotifications.DRAIN_ENERGY,
                CharacterModule.CharacterNotifications.ATTACK_COMPLETE,
                CharacterModule.CharacterNotifications.MOVE_WHEN_HIT,
                ConnectionModule.ConnectionSignals.YOUR_TURN,
                RoundsModule.RoundsNotifications.FIGHT,
                CameraModule.CameraNotifications.CAMERA_MOVE_COMPLETE,
                CharacterActionType.ATTACK];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as CharacterView).updateCharacter();
                    break;
                case CharacterModule.CharacterNotifications.GRID_TOUCHED:
                    var tile:Phaser.Sprite = notification.body as Phaser.Sprite;
                    (this.moveVO.destination = new Phaser.Point(tile.x, tile.y));
                    (this.viewComponent as CharacterView).startMoving(tile.x, tile.y, tile.width, tile.height);
                    this.sendNotification(UserInterfaceModule.UINotifications.HIDE_MOVE_MENU);
                    break;
                case CharacterModule.CharacterNotifications.TAKE_DAMAGE:
                    (this.viewComponent as CharacterView).animateHit();
                    break;
                case CharacterModule.CharacterNotifications.DRAIN_ENERGY:
                        MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_ENERGY,
                        this.characterProxy.getEnergy());
                    break;
                case CharacterActionType.ATTACK:
                    if((this.viewComponent as CharacterView).currentAction == CharacterModule.CharacterActionType.MOVE)
                    {
                        this.moveVO.destination = new Phaser.Point(
                            (this.viewComponent as CharacterView).graphics.x,
                            (this.viewComponent as CharacterView).graphics.y
                                                                    );
                        (this.viewComponent as CharacterView).skipMove();
                    }
                    else
                    {
                        this.characterProxy.setAbility(notification.body);
                        (this.viewComponent as CharacterView).setCharacterAttackAction(notification.body);
                    }
                    break;
                case ConnectionModule.ConnectionSignals.YOUR_TURN:

                    this.sendNotification(CameraModule.CameraNotifications.MOVE_CAMERA,
                        {
                            initialX:this.enemyProxy.getCharacter().x,
                            initialY:this.enemyProxy.getCharacter().y,
                            x:this.characterProxy.getCharacter().x,
                            y:this.characterProxy.getCharacter().y
                        });

                    this.characterTurn = true;

                    break;
                case CameraModule.CameraNotifications.CAMERA_MOVE_COMPLETE:
                    if(this.characterTurn)
                    {
                        this.characterTurn = false;

                        this.moveVO.player_pos = new Phaser.Point(
                            (this.viewComponent as CharacterView).graphics.x,
                            (this.viewComponent as CharacterView).graphics.y
                        );
                        (this.viewComponent as CharacterView).characterTurn();

                        this.sendNotification(CameraModule.CameraNotifications.SET_CAMERA_FOLLOWER,
                            this.characterProxy.getCharacter());
                    }
                    break;
                case CharacterModule.CharacterNotifications.ATTACK_COMPLETE:
                    this.dispatchSignal(ConnectionModule.ConnectionSignals.MOVE, this.getMoveVO());
                    break;
                case RoundsModule.RoundsNotifications.FIGHT:
                    (this.viewComponent as CharacterView).updateEnemy(this.enemyProxy.getCharacter());
                    break;
                case CharacterModule.CharacterNotifications.MOVE_WHEN_HIT:
                    (this.viewComponent as CharacterView).startMovingWhenHit();
                    break;
            }
        }

        getMoveVO():ConnectionModule.MoveVO
        {
            this.characterProxy.setEnergy(this.characterProxy.getEnergy() - 10);
            this.characterProxy.setAbility((this.viewComponent as CharacterView).attackAction);
            this.moveVO.ability = this.characterProxy.getAbility();
            this.moveVO.player_energy = this.characterProxy.getEnergy();
            this.moveVO.player_health = this.characterProxy.getLife();
            this.moveVO.opponent_energy = this.enemyProxy.getEnergy();
            this.moveVO.opponent_health = this.enemyProxy.getLife();
            this.moveVO.opponent_pos = this.enemyProxy.getCharacter().position;

            return this.moveVO;
        }
    }
}