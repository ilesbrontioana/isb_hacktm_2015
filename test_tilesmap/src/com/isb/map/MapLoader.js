/**
 * Created by ioanailes on 28/10/15.
 */
var MapLoader;
(function (MapLoader) {
    var Map = (function () {
        function Map(game, assetPath) {
            this.game = game;
            this.assetPath = assetPath;
        }
        Map.prototype.loadMap = function (name) {
            this.game.load.tilemap(name + 'map', this.assetPath + name + '.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image(name + 'tiles', this.assetPath + name + '.png');
        };
        Map.prototype.createMap = function (name) {
            var map = this.game.add.tilemap(name + 'map');
            map.addTilesetImage(name, name + 'tiles');
            map.setCollisionBetween(0, map.tiles.length);
            Map.maps[name] = map;
        };
        Map.prototype.createLayer = function (mapName, layerName) {
            var layer = Map.maps[mapName].createLayer(layerName);
            layer.resizeWorld();
            if (Map.layers[mapName] == null) {
                Map.layers[mapName] = {};
            }
            Map.layers[mapName][layerName] = layer;
        };
        Map.maps = {};
        Map.layers = {};
        return Map;
    })();
    MapLoader.Map = Map;
})(MapLoader || (MapLoader = {}));
//# sourceMappingURL=maploader.js.map