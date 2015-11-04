/**
 * Created by adm on 04.11.15.
 */
module EventsModule
{
    export class SignalsManager{
        private static _instance:SignalsManager = new SignalsManager();
        public signals: ISignal = {};
        public scope;

        constructor(){
            if(SignalsManager._instance){
                throw new Error("Te Dreq: Instantiation failed: Use SignalsManager.getInstance()");
            }
            SignalsManager._instance = this;
        }

        public static getInstance():SignalsManager {
            return SignalsManager._instance;
        }

        public createBinding(name:string, listener, listenerContext?, priority?, args?){
            if(!this.signals[name]) {
                var custBind:CustomBinding = new CustomBinding();
                this.signals[name] = custBind;
            }

            var signalBinding:Phaser.SignalBinding = new Phaser.SignalBinding(this.signals[name].signal, listener, false, listenerContext, priority, args);
            this.signals[name].bindings.push(signalBinding);
            this.signals[name].context = listenerContext;
        }

        public dispatch(name:string, args?){
            var bindings = this.signals[name].bindings;
            for(var i = 0; i<bindings.length; i++){
                bindings[i].getListener().call(this.signals[name].context, args);
            }
        }
    }

    export interface ISignal {
        [name:string]:CustomBinding
    }

    export class CustomBinding{
        public signal:Phaser.Signal
        public bindings:Array<SignalBinding>
        public context;

        constructor(){
            this.signal = new Phaser.Signal();
            this.bindings = new Array();
        }
    }
}