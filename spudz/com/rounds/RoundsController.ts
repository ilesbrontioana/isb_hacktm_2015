/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsCommand extends MvcModule.Controller{
        static NAME:string = "RoundsController";

        moveVo:ConnectionModule.MoveVO;

        constructor()
        {
            super(RoundsCommand.NAME);
        }

        execute(notification:MvcModule.INotification){
            this.moveVo.destination = notification.body.destination;
            this.moveVo.ability = notification.body.ability;
            this.moveVo.player_pos = notification.body.player_pos;
            this.moveVo.opponent_pos = notification.body.opponent_pos;
            this.moveVo.player_health = notification.body.player_health;
            this.moveVo.opponent_health = notification.body.opponent_health;
            this.moveVo.player_energy = notification.body.player_energy;
            this.moveVo.opponent_energy = notification.body.opponent_energy;

            MvcModule.Mvc.getInstance().sendNotification(RoundsModule.RoundsNotifications.UPDATE_ROUND, this.moveVo);
        }

        onRegister(){
            this.moveVo = new ConnectionModule.MoveVO();
        }
    }
}