/**
 * Created by adm on 07.11.15.
 */
module GridModule
{
    export class GridView{

        tiles = [];

        constructor (){
            EventsModule.SignalsManager.getInstance().createBinding("GridCreated", function(){
            }, this);
            this.buildGrid(0, 0, 50, 35, 40, 40);
        }

        buildGrid(x:number, y:number, gridH:number, gridV:number, tileW:number, tileH:number){
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
                    GameControllerModule.GameController.getInstance().game.physics.enable(t.graphics, Phaser.Physics.ARCADE);
                }
            }
        }

        getTiles():Array
        {
            return this.tiles;
        }

        getTileAt(x, y):GridModule.Tile
        {
            for(var i = 0; i < this.tiles.length; i++) {
                for (var j = 0; j < this.tiles[i].length; j++) {
                    if(x >= this.tiles[i][j].graphics.x && x < this.tiles[i][j].graphics.x + this.tiles[i][j].graphics.width
                        && y >= this.tiles[i][j].graphics.y && y < this.tiles[i][j].graphics.y + this.tiles[i][j].graphics.height)
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
            this.graphics.alpha = 0;
        }
    }
}