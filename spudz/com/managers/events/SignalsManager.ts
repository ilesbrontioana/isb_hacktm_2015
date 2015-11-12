/**
 * Created by adm on 04.11.15.
 */
/// <reference path="../../../phaser.d.ts" />

module EventsModule
{
    export class SignalsManager{
        private static _instance:SignalsManager = new SignalsManager();
        public signals: ISignal = {};

        constructor(){
            if(SignalsManager._instance){
                throw new Error("Te Dreq: Instantiation failed: Use SignalsManager.getInstance()");
            }
            SignalsManager._instance = this;
        }

        public static getInstance():SignalsManager {
            return SignalsManager._instance;
        }

        public createBinding(signalName:string, listener:Function, listenerContext?:any, priority?:number, args?:any){
            if(!this.signals[name]) {
                var custBind:CustomBinding = new CustomBinding();
                this.signals[name] = custBind;
            }

            var signalBinding:Phaser.SignalBinding = new Phaser.SignalBinding(this.signals[name].signal, listener, false, listenerContext, priority, args);
            this.signals[name].bindings.push(signalBinding);
            this.signals[name].context = listenerContext;
        }

        public dispatch(name:string, args?:any){
            var bindings = this.signals[name].bindings;
            for(var i = 0; i<bindings.length; i++){
                bindings[i].getListener().call(this.signals[name].context, args);
            }
        }

        public removeListener(signalName:string, listener:Function){
             var bindings = this.signals[signalName].bindings;
                for(var i = 0; i<bindings.length; i++){
                    if(bindings[i].getListener() === listener){
                        bindings.splice(i,1);
                    }
                }
        }
    }

    export interface ISignal {
        [name:string]:CustomBinding
    }

    export class CustomBinding{
        public signal:Phaser.Signal
        public bindings:Array<Phaser.SignalBinding>

        constructor(){
            this.signal = new Phaser.Signal();
            this.bindings = new Array();
        }
    }
}