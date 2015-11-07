/**
 * Created by adm on 07.11.15.
 */
module GridModule
{
    export class GridView{

        tiles = [];

        constructor (){
            this.buildGrid(0, 0, 50, 35, 40, 40);
            EventsModule.SignalsManager.getInstance().createBinding("TiledClicked", function(){
            }, this);
            this.addActionRayAt(640, 300, 5);
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

            this.addActionRayAt(0, 0, 50);
        }

        addActionRayAt(x, y, radius)
        {
            var tileAtPoint:GridModule.Tile = this.getTileAt(x, y);
            var circleCenterX = radius * tileAtPoint.graphics.width + tileAtPoint.graphics.width/2;
            var circleCenterY = radius * tileAtPoint.graphics.height + tileAtPoint.graphics.height/2;

            var bmd = GameControllerModule.GameController.getInstance().game.add.bitmapData(circleCenterX * 2, circleCenterY * 2);
            bmd.ctx.fillStyle = '#CCCCCC';
            bmd.ctx.beginPath();
            bmd.ctx.arc(circleCenterX, circleCenterY, radius * tileAtPoint.graphics.width, 0, Math.PI*2, true);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            GameControllerModule.GameController.getInstance().game.cache.addBitmapData("CircleBMP", bmd);

            var cicle  = GameControllerModule.GameController.getInstance().game.add.sprite(x - circleCenterX, y - circleCenterY, GameControllerModule.GameController.getInstance().game.cache.getBitmapData("CircleBMP"));
            cicle.inputEnabled = true;
            cicle.alpha = 0.5;
            cicle.events.onInputDown.add(this.circleTouched, this);
        }

        circleTouched(circle:Phaser.Sprite, pointer){
            var tile = this.getTileAt(pointer.worldX, pointer.worldY);
            EventsModule.SignalsManager.getInstance().dispatch("TiledClicked", tile.graphics);
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