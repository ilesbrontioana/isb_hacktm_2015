/**
 * Created by Ioana on 11/7/2015.
 */
module CharacterModule
{
    import View = MvcModule.View;
    export class ActionRayView extends View
    {
        static NAME:string = "ActionRayView";

        static MELEE_RAY:number = 6;
        static RANGE_RAY:number = 12;
        static MOVE_RAY:number = 6;

        tiles:Array<Array<GridModule.Tile>> = [];

        moveCircle:Phaser.Sprite;
        meleeCircle:Phaser.Sprite;
        rangeCircle:Phaser.Sprite;

        currentCircle:Phaser.Sprite;

        constructor()
        {
            super(ActionRayView.NAME);
            this.createActionRays();

            EventsModule.SignalsManager.getInstance().createBinding("TiledClicked", function(){
            }, this);
        }

        createActionRays()
        {
            var moveCircleCenterX = ActionRayView.MOVE_RAY * GridModule.GridView.tileWidth;
            var moveCircleCenterY = ActionRayView.MOVE_RAY * GridModule.GridView.tileWidth;

            var bmdMove = this.game.add.bitmapData(moveCircleCenterX * 2, moveCircleCenterY * 2);
            bmdMove.ctx.fillStyle = '#00FF00';
            bmdMove.ctx.beginPath();
            bmdMove.ctx.arc(moveCircleCenterX, moveCircleCenterY, ActionRayView.MOVE_RAY * GridModule.GridView.tileWidth, 0, Math.PI*2, true);
            bmdMove.ctx.closePath();
            bmdMove.ctx.fill();
            this.game.cache.addBitmapData("MoveCircleBMP", bmdMove);

            var meleeCircleCenterX = ActionRayView.MELEE_RAY * GridModule.GridView.tileWidth;
            var meleeCircleCenterY = ActionRayView.MELEE_RAY * GridModule.GridView.tileWidth;

            var bmdMelee = this.game.add.bitmapData(
                                    meleeCircleCenterX * 2,
                                    meleeCircleCenterY * 2);
            bmdMelee.ctx.fillStyle = '#FF0000';
            bmdMelee.ctx.beginPath();
            bmdMelee.ctx.arc(meleeCircleCenterX, meleeCircleCenterY, ActionRayView.MELEE_RAY * GridModule.GridView.tileWidth, 0, Math.PI*2, true);
            bmdMelee.ctx.closePath();
            bmdMelee.ctx.fill();
            this.game.cache.addBitmapData("MeleeCircleBMP", bmdMelee);

            var rangeCircleCenterX = ActionRayView.RANGE_RAY * GridModule.GridView.tileWidth;
            var rangeCircleCenterY = ActionRayView.RANGE_RAY * GridModule.GridView.tileWidth;

            var bmdRange = this.game.add.bitmapData(
                rangeCircleCenterX * 2,
                rangeCircleCenterY * 2);
            bmdRange.ctx.fillStyle = '#FF0000';
            bmdRange.ctx.beginPath();
            bmdRange.ctx.arc(rangeCircleCenterX, rangeCircleCenterY, ActionRayView.RANGE_RAY * GridModule.GridView.tileWidth, 0, Math.PI*2, true);
            bmdRange.ctx.closePath();
            bmdRange.ctx.fill();
            this.game.cache.addBitmapData("RangeCircleBMP", bmdRange);

            this.moveCircle  = this.game.add.sprite(0, 0,
                                this.game.cache.getBitmapData("MoveCircleBMP"));
            this.moveCircle.inputEnabled = true;
            this.moveCircle.alpha = 0.5;
            this.moveCircle.visible = false;
            this.moveCircle.anchor.setTo(0.5, 0.5);
            this.moveCircle.events.onInputDown.add(this.circleTouched, this);

            this.meleeCircle  = this.game.add.sprite(0, 0,
                this.game.cache.getBitmapData("MeleeCircleBMP"));
            this.meleeCircle.inputEnabled = true;
            this.meleeCircle.alpha = 0.5;
            this.meleeCircle.visible = false;
            this.meleeCircle.anchor.setTo(0.5, 0.5);

            this.rangeCircle  = this.game.add.sprite(0, 0,
                this.game.cache.getBitmapData("RangeCircleBMP"));
            this.rangeCircle.inputEnabled = true;
            this.rangeCircle.alpha = 0.5;
            this.rangeCircle.visible = false;
            this.rangeCircle.anchor.setTo(0.5, 0.5);


        }

        setGrid(tiles:Array<Array<GridModule.Tile>>)
        {
            this.tiles = tiles;
        }

        addActionRayAt(x:number, y:number, actionType:string)
        {
            this.removeActionRay();

            if(actionType == CharacterModule.CharacterActionType.MELEE)
            {
                this.currentCircle = this.meleeCircle;
            }
            else if(actionType == CharacterModule.CharacterActionType.RANGE)
            {
                this.currentCircle = this.rangeCircle;
            }
            else
            {
                this.currentCircle = this.moveCircle;
            }

            this.currentCircle.x = x;
            this.currentCircle.y = y;
            this.currentCircle.visible = true;

        }

        removeActionRay()
        {
            if(this.currentCircle)
            {
                this.currentCircle.visible = false;
            }
        }

        circleTouched(circle:Phaser.Sprite, pointer:Phaser.Pointer){
            var tile = this.getTileAt(pointer.worldX, pointer.worldY);
            this.signalsManager.dispatch("CircleTouched", tile.graphics);
            this.removeActionRay();
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