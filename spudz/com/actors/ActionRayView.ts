/**
 * Created by Ioana on 11/7/2015.
 */
module CharacterModule
{
    import View = MvcModule.View;
    export class ActionRayView extends View
    {
        tiles = [];

        moveCircle;
        attackCircle;

        moveCircleRadius = 6;
        attackCircleRadius = 12;

        constructor()
        {
            super();
            this.createActionRays();

            EventsModule.SignalsManager.getInstance().createBinding("TiledClicked", function(){
            }, this);
        }

        createActionRays()
        {
            //60 is 1 + 1/2 tiles
            var tilesSize = 40;
            var moveCircleCenterX = this.moveCircleRadius * tilesSize;
            var moveCircleCenterY = this.moveCircleRadius * tilesSize;

            var bmdMove = GameControllerModule.GameController.getInstance().game.add.bitmapData(moveCircleCenterX * 2, moveCircleCenterY * 2);
            bmdMove.ctx.fillStyle = '#00FF00';
            bmdMove.ctx.beginPath();
            bmdMove.ctx.arc(moveCircleCenterX, moveCircleCenterY, this.moveCircleRadius * tilesSize, 0, Math.PI*2, true);
            bmdMove.ctx.closePath();
            bmdMove.ctx.fill();
            GameControllerModule.GameController.getInstance().game.cache.addBitmapData("GreenCircleBMP", bmdMove);

            var attackCircleCenterX = this.attackCircleRadius * tilesSize;
            var attackCircleCenterY = this.attackCircleRadius * tilesSize;

            var bmdAttack = GameControllerModule.GameController.getInstance().game.add.bitmapData(
                                    attackCircleCenterX * 2,
                                    attackCircleCenterY * 2);
            bmdAttack.ctx.fillStyle = '#FF0000';
            bmdAttack.ctx.beginPath();
            bmdAttack.ctx.arc(attackCircleCenterX, attackCircleCenterY, this.attackCircleRadius * tilesSize, 0, Math.PI*2, true);
            bmdAttack.ctx.closePath();
            bmdAttack.ctx.fill();
            GameControllerModule.GameController.getInstance().game.cache.addBitmapData("RedCircleBMP", bmdAttack);

            this.moveCircle  = GameControllerModule.GameController.getInstance().game.add.sprite(0, 0,
                                GameControllerModule.GameController.getInstance().game.cache.getBitmapData("GreenCircleBMP"));
            this.moveCircle.inputEnabled = true;
            this.moveCircle.alpha = 0;
            this.moveCircle.anchor.setTo(0.5, 0.5);
            this.moveCircle.events.onInputDown.add(this.circleTouched, this);

            this.attackCircle  = GameControllerModule.GameController.getInstance().game.add.sprite(0, 0,
                GameControllerModule.GameController.getInstance().game.cache.getBitmapData("RedCircleBMP"));
            this.attackCircle.inputEnabled = true;
            this.attackCircle.alpha = 0;
            this.attackCircle.anchor.setTo(0.5, 0.5);
            this.attackCircle.events.onInputDown.add(this.circleTouched, this);
            GameControllerModule.GameController.getInstance().game.physics.enable(this.attackCircle, Phaser.Physics.ARCADE);


        }

        setGrid(tiles)
        {
            this.tiles = tiles;
        }

        addActionRayAt(x, y, actionType)
        {
            var tileAtPoint:GridModule.Tile = this.getTileAt(x, y);

            var circle;
            if(actionType == CharacterModule.CharacterActionType.ATTACK)
            {
                circle = this.attackCircle
            }
            else {
                circle = this.moveCircle
            }

            //var circleCenterX = x + circle.width/2;
            //var circleCenterY = x + circle.width/2;

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

        circleTouched(circle:Phaser.Sprite, pointer){
            if(circle.alpha > 0)
            {
                var tile = this.getTileAt(pointer.worldX, pointer.worldY);
                EventsModule.SignalsManager.getInstance().dispatch("TiledClicked", tile.graphics);
                this.removeActionRay();
            }
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
}