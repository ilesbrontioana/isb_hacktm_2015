/**
 * Created by adm on 13.11.15.
 */
module MvcModule{
    export interface ISignalsManager{
        createBinding(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any):void
        dispatch(signalName:string, args?:any):void
        removeListener(signalName:string, listener:Function):void
    }
}