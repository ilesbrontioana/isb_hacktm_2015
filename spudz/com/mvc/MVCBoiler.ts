/**
 * Created by adm on 16.11.15.
 */
module MvcModule{
    export class MVCBoiler{
        constructor(){
            var kernel = new inversify.Kernel();
            kernel.bind(new inversify.TypeBinding<MvcModule.ISignalsManager>("ISignalsManager", EventsModule.SignalsManager, inversify.TypeBindingScopeEnum.Singleton));
            kernel.bind(new inversify.TypeBinding<MvcModule.IMVC>("IMVC", MvcModule.Mvc, inversify.TypeBindingScopeEnum.Singleton));

            var mvc = kernel.resolve<MvcModule.IMVC>("IMVC");
        }
    }
}