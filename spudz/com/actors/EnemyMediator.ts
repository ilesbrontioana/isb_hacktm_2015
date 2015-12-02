/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class EnemyMediator extends MvcModule.Mediator
    {
        static NAME:string = "EnemyMediator";

        characterProxy:CharacterModule.CharacterProxy;
        enemyProxy:CharacterModule.EnemyProxy;

        moveVO:ConnectionModule.MoveVO;

        constructor(viewComponent:MvcModule.View){

            super(EnemyMediator.NAME, viewComponent);
        }

        onRegister(){

            this.initListeners();

            this.moveVO = new ConnectionModule.MoveVO();

            this.enemyProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.EnemyProxy.NAME) as CharacterModule.EnemyProxy);
            this.enemyProxy.setCharacterName((MvcModule.Mvc.getInstance().retrieveProxy(SelectionScreenModule.SelectionScreenProxy.NAME) as SelectionScreenModule.SelectionScreenProxy).getOpponentSelection());

            var x = 1160;
            var y = 1255;
            (this.viewComponent as CharacterView).createCharacter(this.enemyProxy.getCharacterName(), x, y, false);

            this.enemyProxy.setCharacter((this.viewComponent as EnemyView).graphics);

            this.characterProxy = (MvcModule.Mvc.getInstance().retrieveProxy(CharacterModule.CharacterProxy.NAME) as CharacterModule.CharacterProxy);

        }


        initListeners()
        {
            this.addListenerToSignal("CharacterDamage", function(damage:number){
                this.enemyProxy.setLife(this.enemyProxy.getLife() - damage);
                MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE_ENEMY, damage);
                MvcModule.Mvc.getInstance().sendNotification(CharacterModule.CharacterNotifications.ATTACK_COMPLETE, damage);
            },this);

            this.addListenerToSignal("EnemyLandComplete", function(damage:number){

                if(this.moveVO.destination.x == this.moveVO.player_pos.x &&
                    this.moveVO.destination.y == this.moveVO.player_pos.y)
                {
                    (this.viewComponent as EnemyView).setCharacterAttackAction(this.moveVO.ability);
                    (this.viewComponent as EnemyView).skipMove();
                }
                else
                {
                    (this.viewComponent as EnemyView).startMoving(this.moveVO.destination.x, this.moveVO.destination.y,
                        GridModule.GridView.tileWidth, GridModule.GridView.tileWidth);
                    (this.viewComponent as EnemyView).setCharacterAttackAction(this.moveVO.ability);
                }

            },this);

            this.addListenerToSignal("OpponentActionsComplete", function(){
                if(this.moveVO.ability == CharacterModule.CharacterActionType.MELEE ||
                    this.moveVO.ability == CharacterModule.CharacterActionType.RANGE)
                {
                    this.sendNotification(CharacterModule.CharacterNotifications.MOVE_WHEN_HIT);
                }
                if(this.moveVO.opponent_health < this.characterProxy.getLife())
                {
                    console.log("enemy: hit player");
                    MvcModule.Mvc.getInstance().sendNotification(UserInterfaceModule.UINotifications.UPDATE_LIFE,
                        this.characterProxy.getLife() - this.moveVO.opponent_health);
                    this.updateCharacters();
                    this.sendNotification(CharacterNotifications.TAKE_DAMAGE);
                }
                else
                {
                    console.log("enemy: no hit " + this.moveVO.opponent_health + " " + this.characterProxy.getLife());
                    this.updateCharacters();
                    this.dispatchSignal(ConnectionModule.ConnectionSignals.OPPONENT_MOVE_COMPLETE);
                }


            },this);
        }

        updateCharacters()
        {
            this.characterProxy.setLife(this.moveVO.opponent_health);
            this.characterProxy.setEnergy(this.moveVO.opponent_energy);

            this.enemyProxy.setEnergy(this.moveVO.player_energy);
            this.enemyProxy.setLife(this.moveVO.player_health);
        }


        listNotificationInterests():Array<string>{
            return [CharacterModule.CharacterNotifications.UPDATE_CHARACTER,
                CharacterModule.CharacterNotifications.ATTACK_ENEMY,
                ConnectionModule.ConnectionSignals.MOVE,
                RoundsModule.RoundsNotifications.FIGHT
            ];
        }

        handleNotification(notification:MvcModule.INotification) {
            switch (notification.name){
                case CharacterModule.CharacterNotifications.UPDATE_CHARACTER:
                    (this.viewComponent as EnemyView).updateCharacter();
                    break;
                case  CharacterModule.CharacterNotifications.ATTACK_ENEMY:
                    (this.viewComponent as EnemyView).addDamage(this.characterProxy.getAbility());
                    break;
                case ConnectionModule.ConnectionSignals.MOVE:

                    this.moveVO = notification.body;

                    (this.viewComponent as EnemyView).characterTurn();

                    break;
                case RoundsModule.RoundsNotifications.FIGHT:
                    (this.viewComponent as EnemyView).updateEnemy(this.characterProxy.getCharacter());
                    break;
            }
        }
    }
}