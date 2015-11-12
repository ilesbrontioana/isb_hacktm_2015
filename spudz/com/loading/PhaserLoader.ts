/**
 * Created by ioanailes on 12/11/15.
 */
module LoadingModule
{
    export class PhaserLoader implements IAbstractLoader
    {
        game:Phaser.Game;

        constructor()
        {
            this.game = GraphicsModule.GraphicsManager.getInstance().game;
        }

        startLoading()
        {
            this.game.load.start();
        }

        addOnFileComplete(callback:Function)
        {
            this.game.load.onFileComplete.add(callback, this);
        }

        addOnComplete(callback:Function)
        {
            this.game.load.onLoadComplete.add(callback, this);
        }

        public loadAtlas(key:string, path:string, imageName:string, jsonName:string)
        {
            this.game.load.atlas(key,  path + imageName, path + jsonName, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        }

        public loadMap(key:string, path:string)
        {
            this.game.load.tilemap(key + 'map', path + key + '.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image(key + 'tiles', path + key + '.png');
        }

        public loadBitmapFont(key:string, path:string)
        {
            this.game.load.bitmapFont('font', path + key + '.png', path + key + '.fnt');
        }

        public loadImage(key:string, path:string, imageName:string)
        {
            this.game.load.image(key, path + imageName);
        }
    }
}