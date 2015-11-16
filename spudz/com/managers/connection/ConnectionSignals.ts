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
        static OPPONENT_MOVE: string = "opponent_move";
        static MOVE_SKIP: string = "move_skip";
        static REGISTER_NAME: string = "register_name";
        static PLAYER_READY: string = "player_ready";

        //server to client
        static OPPONENT_CHARACTER: string = "opponent_character";
        static YOUR_TURN: string = "your_turn";
        static END_TURN: string = "end_turn";
        static MATCH_STARTED: string = "match_started";
        static MATCH_FOUND: string = "match_found";
        static RECONCILIATION: string = "reconciliation";
        static WIN: string = "win";
        static OPPONENT_DISCONNECTED: string = "opponent_disconnected";
        static MOVE_TIME_EXPIRED: string = "move_time_expired";
        static OPPONENT_SKIP: string = "opponent_skip";
        static ERROR: string = "error";

        constructor(){

        }
    }
}