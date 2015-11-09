/**
 * Created by ioanailes on 28/10/15.
 */
module MapModule
{
    export class Map{

        assetPath = '../../spudz/bin/assets/map/';

        static maps: {[name:string]:Phaser.Tilemap; } = {};
        static layers: {[name:string]: {[layerName:string]: Phaser.TilemapLayer;}; } = {};

        constructor () {
        }

        loadMap(name:string) {
            GameControllerModule.GameController.getInstance().game.load.tilemap(name + 'map', this.assetPath + name + '.json', null, Phaser.Tilemap.TILED_JSON);
            GameControllerModule.GameController.getInstance().game.load.image(name + 'tiles', this.assetPath + name + '.png');
        }

        createMap(name:string) {
            var map = GameControllerModule.GameController.getInstance().game.add.tilemap(name + 'map');
            map.addTilesetImage(name, name + 'tiles');
            map.setCollisionBetween(0, map.tiles.length);

            Map.maps[name] = map;
        }

        createLayer(mapName:string, layerName:string)
        {
            var layer = Map.maps[mapName].createLayer(layerName);
            layer.resizeWorld();

            if(Map.layers[mapName] == null)
            {
                Map.layers[mapName] = {};
            }
            Map.layers[mapName][layerName] = layer;

            GameControllerModule.GameController.getInstance().game.physics.enable(layer, Phaser.Physics.ARCADE);

            Map.maps[mapName].setCollisionByExclusion([], true, layer);
        }

        setLayerCollision(mapName:string, layerName:string, collideUp:boolean, collideLeft:boolean, collideRight:boolean, collideDown:boolean)
        {
            var layer = Map.layers[mapName][layerName];
            var grid = layer.layer.data;
            for(var i = 0; i < grid.length; i++)
            {
                for(var j = 0; j < grid[i].length; j++)
                {
                    var tile:Phaser.Tile = grid[i][j];
                    tile.collideUp = collideUp;
                    tile.collideLeft = collideLeft;
                    tile.collideRight = collideRight;
                    tile.collideDown = collideDown;
                }
            }
        }

    }
}