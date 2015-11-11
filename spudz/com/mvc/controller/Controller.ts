/**
 * Created by adm on 05.11.15.
 */
module MvcModule{
    export class Controller implements IController{
        public name:string;

        constructor(name:string){
            this.name = name;
        }

        public execute(notification:INotification){

        }

        public onRegister(){

        }

        public onUnregister(){

        }
    }
}