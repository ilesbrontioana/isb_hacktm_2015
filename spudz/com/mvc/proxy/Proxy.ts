/**
 * Created by adm on 05.11.15.
 */
module MvcModule {
    export class Proxy {

        public VO:any

        public sendNotification(notificationName:string, body?:any, type?:string) {
            Mvc.getInstance().sendNotification(notificationName, body, type);
        }

        public onRegister(){

        }
    }
}