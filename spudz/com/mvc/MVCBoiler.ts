/**
 * Created by adm on 16.11.15.
 */
    /// <reference path="inversify.d.ts" />
module MvcModule{
    export class MVCBoiler{

        public kernel:inversify.KernelInterface;

        constructor(){
            this.kernel = new inversify.Kernel();

            this.configureInjections();
            this.resolveInjections();
            this.onStart();
        }

        public configureInjections(){
            this.kernel.bind(new inversify.TypeBinding<MvcModule.ISignalsManager>("ISignalsManager", EventsModule.SignalsManager, inversify.TypeBindingScopeEnum.Singleton));
            this.kernel.bind(new inversify.TypeBinding<MvcModule.IMVC>("IMVC", MvcModule.Mvc, inversify.TypeBindingScopeEnum.Singleton));
        }

        public resolveInjections(){
            this.kernel.resolve<MvcModule.IMVC>("IMVC");
        }

        public onStart(){

        }
    }
}