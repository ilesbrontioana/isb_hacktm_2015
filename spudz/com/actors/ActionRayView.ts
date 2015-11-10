/**
 * Created by Ioana on 11/7/2015.
 */
module CharacterModule
{
    import View = MvcModule.View;
    export class ActionRayView extends View
    {
        tiles:Array<Array<GridModule.Tile>> = [];

        moveCircle:Phaser.Sprite;
        attackCircle:Phaser.Sprite;

        moveCircleRadius:number = 6;
        attackCircleRadius:number = 12;

        constructor()
        {
            super();
            this.createActionRays();

            EventsModule.SignalsManager.getInstance().createBinding("TiledClicked", function(){
            }, this);
        }

        createActionRays()
        {
            var tilesSize = 40;
            var moveCircleCenterX = this.moveCircleRadius * tilesSize;
            var moveCircleCenterY = this.moveCircleRadius * tilesSize;

            var bmdMove = this.game.add.bitmapData(moveCircleCenterX * 2, moveCircleCenterY * 2);
            bmdMove.ctx.fillStyle = '#00FF00';
            bmdMove.ctx.beginPath();
            bmdMove.ctx.arc(moveCircleCenterX, moveCircleCenterY, this.moveCircleRadius * tilesSize, 0, Math.PI*2, true);
            bmdMove.ctx.closePath();
            bmdMove.ctx.fill();
            this.game.cache.addBitmapData("GreenCircleBMP", bmdMove);

            var attackCircleCenterX = this.attackCircleRadius * tilesSize;
            var attackCircleCenterY = this.attackCircleRadius * tilesSize;

            var bmdAttack = this.game.add.bitmapData(
                                    attackCircleCenterX * 2,
                                    attackCircleCenterY * 2);
            bmdAttack.ctx.fillStyle = '#FF0000';
            bmdAttack.ctx.beginPath();
            bmdAttack.ctx.arc(attackCircleCenterX, attackCircleCenterY, this.attackCircleRadius * tilesSize, 0, Math.PI*2, true);
            bmdAttack.ctx.closePath();
            bmdAttack.ctx.fill();
            this.game.cache.addBitmapData("RedCircleBMP", bmdAttack);

            this.moveCircle  = this.game.add.sprite(0, 0,
                                this.game.cache.getBitmapData("GreenCircleBMP"));
            this.moveCircle.inputEnabled = true;
            this.moveCircle.alpha = 0;
            this.moveCircle.anchor.setTo(0.5, 0.5);
            this.moveCircle.events.onInputDown.add(this.circleTouched, this);

            this.attackCircle  = this.game.add.sprite(0, 0,
                this.game.cache.getBitmapData("RedCircleBMP"));
            this.attackCircle.inputEnabled = true;
            this.attackCircle.alpha = 0;
            this.attackCircle.anchor.setTo(0.5, 0.5);
            this.attackCircle.events.onInputDown.add(this.circleTouched, this);
            this.game.physics.enable(this.attackCircle, Phaser.Physics.ARCADE);


        }

        setGrid(tiles:Array<Array<GridModule.Tile>>)
        {
            this.tiles = tiles;
        }

        addActionRayAt(x:number, y:number, actionType:string)
        {
            var tileAtPoint:GridModule.Tile = this.getTileAt(x, y);

            var circle:Phaser.Sprite;
            if(actionType == CharacterModule.CharacterActionType.ATTACK)
            {
                circle = this.attackCircle
            }
            else {
                circle = this.moveCircle
            }

            circle.x = x;
            circle.y = y;
            circle.alpha = 0.5;

        }

        removeActionRay()
        {
            if(this.attackCircle.alpha > 0)
            {
                this.attackCircle.alpha = 0;
            }

            if(this.moveCircle.alpha > 0)
            {
                this.moveCircle.alpha = 0;
            }
        }

        circleTouched(circle:Phaser.Sprite, pointer:Phaser.Pointer){
            if(circle.alpha > 0)
            {
                var tile = this.getTileAt(pointer.worldX, pointer.worldY);
                this.signalsManager.dispatch("TiledClicked", tile.graphics);
                this.removeActionRay();
            }
        }

        getTileAt(x:number, y:number):GridModule.Tile
        {
            for(var i = 0; i < this.tiles.length; i++) {
                for (var j = 0; j < (this.tiles[i]).length; j++) {
                    var tile:GridModule.Tile = this.tiles[i][j];
                    if(x >= tile.graphics.x && x < tile.graphics.x + tile.graphics.width
                        && y >= tile.graphics.y && y < tile.graphics.y + tile.graphics.height)
                    {
                        return tile;
                    }
                }
            }
            return null;
        }
    }
}