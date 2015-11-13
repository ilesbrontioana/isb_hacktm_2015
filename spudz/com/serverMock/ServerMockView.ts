/**
 * Created by ioanailes on 12/11/15.
 */
module ServerMockModule
{
    export class ServerMockView extends MvcModule.View
    {
        static NAME:string = "ServerMockView";

        constructor()
        {
            super(ServerMockView.NAME);
        }
    }
}