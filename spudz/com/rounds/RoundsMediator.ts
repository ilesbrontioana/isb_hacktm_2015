/**
 * Created by adm on 07.11.15.
 */
module RoundsModule{
    export class RoundsMediator extends MvcModule.Mediator{

        static NAME:string = this+"RoundsMediator";

        constructor(viewComponent:MvcModule.View){
            super(viewComponent);
        }
    }
}