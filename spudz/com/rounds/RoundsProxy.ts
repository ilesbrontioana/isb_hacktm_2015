/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsProxy extends MvcModule.Proxy{

        static NAME:string = this + "RoundsProxy";

        constructor(){
           this.VO = new RoundsModule.RoundsVO();
        }
    }
}