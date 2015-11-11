/**
 * Created by ioanailes on 28/10/15.
 */
module MapModule
{
    export class Map{

        private static _instance:Map = new Map();

        maps: {[name:string]:Phaser.Tilemap; } = {};
        layers: {[name:string]: {[layerName:string]: Phaser.TilemapLayer;}; } = {};

        constructor(){
            if(Map._instance){
                throw new Error("Te Dreq: Instantiation failed: Use Map.getInstance()");
            }
            Map._instance = this;
        }

        public static getInstance():Map {
            return Map._instance;
        }

        loadMap(name:string) {
        }

        createMap(name:string) {
            var map = GraphicsModule.GraphicsManager.getInstance().game.add.tilemap(name + 'map');
            map.addTilesetImage(name, name + 'tiles');
            map.setCollisionBetween(0, map.tiles.length);

            this.maps[name] = map;
        }

        createLayer(mapName:string, layerName:string)
        {
            var layer = this.maps[mapName].createLayer(layerName);
            layer.resizeWorld();

            if(this.layers[mapName] == null)
            {
                this.layers[mapName] = {};
            }
            this.layers[mapName][layerName] = layer;

            GraphicsModule.GraphicsManager.getInstance().game.physics.enable(layer, Phaser.Physics.ARCADE);

            this.maps[mapName].setCollisionByExclusion([], true, layer);
        }

        setLayerCollision(mapName:string, layerName:string, collideUp:boolean, collideLeft:boolean, collideRight:boolean, collideDown:boolean)
        {
            var layer = this.layers[mapName][layerName];
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