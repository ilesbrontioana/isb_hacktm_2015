/**
 * Created by Ioana on 11/2/2015.
 */
var GridModule;
(function (GridModule) {
    var Grid = (function () {
        function Grid(game, tiles) {
            this.grid = [];
            this.signal = new Phaser.Signal();
            this.game = game;
            for (var i = 0; i < tiles.length; i++) {
                this.grid.push([]);
                for (var j = 0; j < tiles[i].length; j++) {
                    var bmd = game.add.bitmapData(tiles[i][j].width, tiles[i][j].heigth);
                    bmd.ctx.fillStyle = '#000000';
                    bmd.ctx.beginPath();
                    bmd.ctx.fillRect(0, 0, tiles[i][j].width, tiles[i][j].heigth);
                    bmd.ctx.closePath();
                    game.cache.addBitmapData("tile " + i + " " + j, bmd);
                    var newTile = game.add.sprite(tiles[i][j].worldX, tiles[i][j].worldY, game.cache.getBitmapData("tile " + i + " " + j));
                    this.grid[i].push(newTile);
                    newTile.inputEnabled = true;
                    newTile.events.onInputDown.add(this.gridTouched, this);
                }
            }
        }
        Grid.prototype.gridTouched = function (tile, pointer) {
            this.signal.dispatch(tile);
        };
        return Grid;
    })();
    GridModule.Grid = Grid;
})(GridModule || (GridModule = {}));
//# sourceMappingURL=grid.js.map