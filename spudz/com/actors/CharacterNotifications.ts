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

        static  TRY_DAMAGE:string = "_character_try_damage";
        static  TRY_DAMAGE_WITH_RAY:string = "_character_try_damage_with_ray";
        static  DAMAGE_COMPLETE:string = "_character_damage_complete";
    }
}