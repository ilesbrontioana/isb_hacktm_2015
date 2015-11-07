/**
 * Created by ioanailes on 28/10/15.
 */
module MapModule
{
    export class Map{

        assetPath = '../../spudz/bin/assets/map/';

        static maps: {[name:string]:Phaser.Tilemap; } = {};
        static layers: {[name:string]: {[layerName:string]: Phaser.Phaser.TilemapLayer;}; } = {};

        constructor () {
        }

        loadMap(name) {
            GameControllerModule.GameController.getInstance().game.load.tilemap(name + 'map', this.assetPath + name + '.json', null, Phaser.Tilemap.TILED_JSON);
            GameControllerModule.GameController.getInstance().game.load.image(name + 'tiles', this.assetPath + name + '.png');
        }

        createMap(name) {
            var map = GameControllerModule.GameController.getInstance().game.add.tilemap(name + 'map');
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

            GameControllerModule.GameController.getInstance().game.physics.enable(layer, Phaser.Physics.ARCADE);

            Map.maps[mapName].setCollisionByExclusion([], true, layer);
        }

        setLayerCollision(mapName, layerName, collideUp, collideLeft, collideRight, collideDown)
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