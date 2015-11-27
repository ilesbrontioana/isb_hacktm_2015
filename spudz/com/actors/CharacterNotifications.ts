/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterNotifications{
        static  NAME:string = "_character_notifications_";

        static  UPDATE_CHARACTER:string = "_character_update_";
        static  GRID_TOUCHED:string = "_character_map_grid_touched";

        static  TAKE_DAMAGE:string = "_character_take_damage";

        static  DRAIN_ENERGY:string = "_character_drain_energy";

        static  CHARACTER_POSITION:string = "_character_position";

        static  ATTACK_ENEMY:string = "_character_attack_enemy";

        static  ATTACK_COMPLETE:string = "_character_attack_complete";

        static  MOVE_WHEN_HIT:string = "_character_move_when_hit";
    }
}