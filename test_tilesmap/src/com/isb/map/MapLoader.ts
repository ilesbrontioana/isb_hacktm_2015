/**
 * Created by ioanailes on 28/10/15.
 */
module MapLoader
{
    export class Map{

        game;
        assetPath;
        static maps: {[name:string]:Phaser.Tilemap; } = {};
        static layers: {[name:string]: {[layerName:string]: Phaser.Phaser.TilemapLayer;}; } = {};

        constructor (game, assetPath) {
            this.game = game;
            this.assetPath = assetPath;
        }

        loadMap(name) {
            this.game.load.tilemap(name + 'map', this.assetPath + name + '.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image(name + 'tiles', this.assetPath + name + '.png');
        }

        createMap(name) {
            var map = this.game.add.tilemap(name + 'map');
            map.addTilesetImage(name, name + 'tiles');
            map.setCollisionBetween(0, map.tiles.length);

            Map.maps[name] = map;
        }

        createLayer(mapName, layerName)
        {
            var layer = Map.maps[mapName].createLayer(layerName);
            layer.resizeWorld();

            if(Map.layers[mapName] == null)
            {
                Map.layers[mapName] = {};
            }
            Map.layers[mapName][layerName] = layer;
        }

    }
}