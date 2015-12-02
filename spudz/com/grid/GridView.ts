/**
 * Created by adm on 07.11.15.
 */
module GridModule
{
    export class GridView extends MvcModule.View{
        static NAME:string = "GridView";
        tiles:Array<Array<GridModule.Tile>> = [];

        static tileWidth:number = 40;
        static tileHeight:number = 40;

        constructor (){
            super(GridView.NAME);
            this.buildGrid(0, 0, 50, 35, 40, 40);
        }

        buildGrid(x:number, y:number, gridH:number, gridV:number, tileW:number, tileH:number){
            GridView.tileHeight = tileH;
            GridView.tileWidth = tileW;
            var bmd = this.game.add.bitmapData(tileW, tileH);
            bmd.ctx.fillStyle = '#CCCCCC';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0, 0, tileW, tileH);
            bmd.ctx.closePath();
            this.game.cache.addBitmapData("GridElementBMD", bmd);
            for (var i = 0; i<gridH; i++){
                this.tiles.push([])
                for (var j = 0; j<gridV; j++){
                    var t:Tile = new Tile("GridElementBMD", x + tileW*i, y + tileH*j, this.game);
                    this.tiles[i].push(t);
                    this.game.physics.enable(t.graphics, Phaser.Physics.ARCADE);
                }
            }
        }

        getTiles():Array<Array<GridModule.Tile>>
        {
            return this.tiles;
        }

        getTileAt(x:number, y:number):GridModule.Tile
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
        graphics:Phaser.Sprite;
        constructor (bitmapKey:string,x:number, y:number, game:Phaser.Game){
            this.graphics = game.add.sprite(x, y, game.cache.getBitmapData(bitmapKey));
            this.graphics.alpha = 0;
        }
    }
}