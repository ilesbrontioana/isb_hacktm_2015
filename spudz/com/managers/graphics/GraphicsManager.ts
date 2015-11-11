/**
 * Created by adm on 04.11.15.
 */
module GraphicsModule
{
    export class GraphicsManager{
        private static _instance:GraphicsManager = new GraphicsManager();
        
        public game:Phaser.Game;

        assetPath = '../../spudz/bin/assets/';

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
            this.game.load.atlas(key, this.assetPath + path + imageName, this.assetPath + path + jsonName, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        }

        public loadMap(key:string, path:string)
        {
            this.game.load.tilemap(key + 'map', this.assetPath + path + key + '.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image(key + 'tiles', this.assetPath + path + key + '.png');
        }

        public loadBitmapFont(key:string, path:string)
        {
            this.game.load.bitmapFont('font', this.assetPath + path + key + '.png', this.assetPath + path + key + '.fnt');
        }

        public loadImage(key:string, path:string, imageName:string)
        {
            this.game.load.image(key, this.assetPath + path + imageName);
        }
    }
}