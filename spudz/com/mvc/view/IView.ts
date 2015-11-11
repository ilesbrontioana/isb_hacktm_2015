/**
 * Created by adm on 11.11.15.
 */
module MvcModule{
    export interface IView{
        name:string;

        dispatchSignal(signalName:string, args?:any):void
        addListener(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any):void
    }
}