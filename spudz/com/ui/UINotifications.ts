/**
 * Created by adm on 07.11.15.
 */
module UserInterfaceModule{
    export class UINotifications{
        static  NAME:string = "_ui_notifications_"
        static  SHOW_MOVE_MENU:string = UINotifications.NAME + "_SHOW_MOVE_MENU";
        static  HIDE_MOVE_MENU:string = UINotifications.NAME + "_HIDE_MOVE_MENU";
        static  SHOW_ACTIONS_MENU:string = UINotifications.NAME + "_SHOW_ACTIONS_MENU";
        static  HIDE_ACTIONS_MENU:string = UINotifications.NAME + "_HIDE_ACTIONS_MENU";
        static  UPDATE_LIFE:string = UINotifications.NAME + "_UPDATE_LIFE";
        static  UPDATE_ENERGY:string = UINotifications.NAME + "_UPDATE_ENERGY";
        static  UPDATE_LIFE_ENEMY:string = UINotifications.NAME + "_UPDATE_LIFE_ENEMY";
        static DISABLE_MELEE_ACTION_BUTTON:string = UINotifications.NAME + "DISABLE_MELEE_ACTION_BUTTON";
        static DISABLE_RANGE_ACTION_BUTTON:string = UINotifications.NAME + "DISABLE_RANGE_ACTION_BUTTON";
        static DISABLE_DEFENCE_ACTION_BUTTON:string = UINotifications.NAME + "DISABLE_DEFENCE_ACTION_BUTTON";
        static WEAPON_SELECTED:string = UINotifications.NAME + "WEAPON_SELECTED";
    }
}
