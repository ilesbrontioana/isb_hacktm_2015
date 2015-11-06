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

        //server to client
        static OPPONENT_CHARACTER: string = "opponent_character";
        static START_MATCH: string = "start_match";
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