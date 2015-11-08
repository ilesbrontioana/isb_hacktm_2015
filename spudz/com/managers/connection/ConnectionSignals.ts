/**
 * Created by Iovan on 06.11.2015.
 */
module ConnectionModule{
    export class ConnectionSignals
    {
        //client to server
        static FIND_MATCH: string = "find_match";
        static SELECT_CHARACTER: string = "select_character";
        static MOVE: string = "move";
        static MOVE_SKIP: string = "move_skip";
        static REGISTER_NAME: string = "register_name";
        static PLAYER_READY: string = "player_ready";
        static CHARACTER_SELECT: string = "character_selected";

        //server to client
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

        constructor(){

        }
    }
}