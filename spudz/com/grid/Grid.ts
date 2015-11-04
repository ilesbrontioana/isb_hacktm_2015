/**
 * Created by adm on 04.11.15.
 */
module GridModule
{
    export class Grid{
        constructor (game:Phaser.Game, x:number, y:number, gridH:number, gridV:number, tileW:number, tileH:number){
            var bmd = game.add.bitmapData(tileW, tileH);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0, 0, tileW, tileH);
            bmd.ctx.closePath();
            game.cache.addBitmapData("GridElementBMD", bmd);
            for (var i = 0; i<gridH; i++){
                for (var j = 0; j<gridV; j++){
                    var t:Tile = new Tile(game, "GridElementBMD", x + tileW*i, y + tileH*j);
                }
            }
        }
    }

    class Tile{
        game;
        constructor (game:Phaser.Game, bitmapKey:string,x:number, y:number){
            var tile = game.add.sprite(x,y,game.cache.getBitmapData(bitmapKey));
            tile.inputEnabled = true;
            tile.events.onInputDown.add(this.gridTouched, this);
            this.game = game;
        }

        gridTouched(tile:Phaser.Sprite){
            console.log(tile.x +" "+tile.y);
            //GameController.getInstance().pauseAll(GameController.getInstance().isPaused ? false:true);
            EventsModule.SignalsManager.getInstance().dispatch("test", tile);
        }
    }
}