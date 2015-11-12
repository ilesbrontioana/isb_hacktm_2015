/**
 * Created by adm on 08.11.15.
 */
module SelectionScreenModule{
    export class SelectionScreenProxy extends MvcModule.Proxy{
        static NAME:string = "SelectionScreenProxy";
        constructor(){
            super(SelectionScreenProxy.NAME);
            this.VO = new SelectionScreenVO();
        }

        public getSelection():string{
            return this.VO.selectedCharacter;
        }

        public getOpponentSelection():string{
            return this.VO.opponentSelection;
        }
    }
}