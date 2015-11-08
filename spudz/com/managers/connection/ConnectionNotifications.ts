/**
 * Created by Iovan on 07.11.2015.
 */

module ConnectionModule
{
    export class ConnectionNotifications{
        static  NAME:string = "_connection_notifications_";

        static MOVE = 'move';
        static OPPONENT_CHARACTER: string = "opponent_character";
        static START_CHARACTER_SELECTION: string = "start_character_selection";
        static MATCH_FOUND: string = "match_found";
        static START_MATCH: string = "start_match";
        static END_MATCH: string = "end_match";
        static MATCH_STARTED: string = "match_started";
        static YOUR_MOVE: string = "your_move";
        static RECONCILIATION: string = "reconciliation";
        static WIN: string = "win";
        static LOSE: string = "lose";
        static OPPONENT_DISCONNECTED: string = "opponent_disconnected";
        static MOVE_TIME_EXPIRED: string = "move_time_expired";
        static OPPONENT_SKIP: string = "opponent_skip";
        static ERROR: string = "error";
    }
}