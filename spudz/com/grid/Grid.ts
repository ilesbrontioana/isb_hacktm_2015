/**
 * Created by adm on 04.11.15.
 */
module GridModule
{
    export class Grid{

        tiles = [];

        constructor (x:number, y:number, gridH:number, gridV:number, tileW:number, tileH:number){
            var bmd = GameControllerModule.GameController.getInstance().game.add.bitmapData(tileW, tileH);
            bmd.ctx.fillStyle = '#CCCCCC';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0, 0, tileW, tileH);
            bmd.ctx.closePath();
            GameControllerModule.GameController.getInstance().game.cache.addBitmapData("GridElementBMD", bmd);
            for (var i = 0; i<gridH; i++){
                this.tiles.push([])
                for (var j = 0; j<gridV; j++){
                    var t:Tile = new Tile("GridElementBMD", x + tileW*i, y + tileH*j);
                    this.tiles[i].push(t);
                }
            }
        }

        addActionRayAt(x, y, radius)
        {
            var tileAtPoint:GridModule.Tile = this.getTileAt(x, y);
            for(var i = 1; i <= radius; i++)
            {
                var rayTiles = i * 4;
                for(var r = 0; r < rayTiles; r++)
                {
                    var angle = (r/rayTiles) * 360;
                    var rad = angle * (Math.PI / 180);
                    var tileX = tileAtPoint.graphics.x + i * tileAtPoint.graphics.width * Math.cos(rad);
                    var tileY = tileAtPoint.graphics.y + i * tileAtPoint.graphics.height * Math.sin(rad);

                    var tile:GridModule.Tile = this.getTileAt(tileX, tileY);
                    tile.graphics.alpha = 0.5;

                    console.log("i = " + i + " angle = " + angle + " ray = " + i * tileAtPoint.graphics.width);

                }
            }
        }

        getTileAt(x, y):GridModule.Tile
        {
            for(var i = 0; i < this.tiles.length; i++) {
                for (var j = 0; j < this.tiles[i].length; j++) {
                    if(this.tiles[i][j].graphics.x == x && this.tiles[i][j].graphics.y == y)
                    {
                        return this.tiles[i][j];
                    }
                }
            }
            return null;
        }
    }

    export class Tile{
        graphics;
        constructor (bitmapKey:string,x:number, y:number){
            this.graphics = GameControllerModule.GameController.getInstance().game.add.sprite(x, y, GameControllerModule.GameController.getInstance().game.cache.getBitmapData(bitmapKey));
            this.graphics.inputEnabled = true;
            this.graphics.alpha = 0;
            this.graphics.events.onInputDown.add(this.gridTouched, this);
        }

        gridTouched(tile:Phaser.Sprite){
            if(tile.alpha == 0.5)
            {
                EventsModule.SignalsManager.getInstance().dispatch("TiledClicked", tile);
            }
        }
    }
}