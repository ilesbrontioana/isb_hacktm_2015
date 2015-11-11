/**
 * Created by adm on 05.11.15.
 */
module MvcModule {
    export class Proxy implements IProxy{
        public name:string;
        public VO:any

        constructor(name:string){
            this.name = name;
        }

        public sendNotification(notificationName:string, body?:any, type?:string) {
            Mvc.getInstance().sendNotification(notificationName, body, type);
        }

        public setVO(vo:any){
            this.VO = vo;
        }

        public getVO():any{
            return this.VO;
        }

        public onRegister(){

        }

        public onUnregister(){

        }
    }
}