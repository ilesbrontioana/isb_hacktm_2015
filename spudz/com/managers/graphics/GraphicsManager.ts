/**
 * Created by adm on 04.11.15.
 */
module GraphicsModule
{
    export class GraphicsManager{
        private static _instance:GraphicsManager = new GraphicsManager();

        constructor(){
            if(GraphicsManager._instance){
                throw new Error("Te Dreq: Instantiation failed: Use GraphicsManager.getInstance()");
            }

            GraphicsManager._instance = this;
        }

        public static getInstance():GraphicsManager {
            return GraphicsManager._instance;
        }

        public loadAtlas(key:string, path:string, imageName:string, jsonName:string){
            GameControllerModule.GameController.getInstance().game.load.atlas(key, path+imageName, path+jsonName, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        }
    }
}