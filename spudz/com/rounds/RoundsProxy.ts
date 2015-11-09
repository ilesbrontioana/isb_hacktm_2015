/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsProxy extends MvcModule.Proxy{

        static NAME:string = "RoundsProxy";

        constructor(){
            super();
            this.VO = new RoundsModule.RoundsVO();
        }

        public setRound(round:any){
            this.VO.currentRound = round;
        }

        public getRound():any{
            return this.VO.currentRound;
        }
    }
}