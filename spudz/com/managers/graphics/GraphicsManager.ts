/**
 * Created by adm on 04.11.15.
 */
module GraphicsModule
{
    export class GraphicsManager{
        private static _instance:GraphicsManager = new GraphicsManager();
        
        public game:Phaser.Game;


        constructor(){
            if(GraphicsManager._instance){
                throw new Error("Te Dreq: Instantiation failed: Use GraphicsManager.getInstance()");
            }

            GraphicsManager._instance = this;
        }

        public static getInstance():GraphicsManager {
            return GraphicsManager._instance;
        }
    }
}