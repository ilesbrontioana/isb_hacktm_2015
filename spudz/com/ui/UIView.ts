/**
 * Created by adm on 06.11.15.
 */
module UserInterfaceModule{
   export class UIView extends MvcModule.View
    {
           game;
           uiBackground:Phaser.Group;
           cellsGroup:Phaser.Group;
           lifeGroup:Phaser.Group;
           actionsGroup:Phaser.Group;

        constructor(){
            this.game = GameControllerModule.GameController.getInstance().game;
            this.uiBackground();
            this.createEnergyCells();
            this.createLife();
            this.createActionsMenu();
        }

       uiBackground(){
           var lifeBackground:Phaser.Sprite = new Phaser.Sprite(this.game, 0,0, "ui", "life_frame.png")
           var enemyLifeBackground:Phaser.Sprite = new Phaser.Sprite(this.game, 1328,0, "ui", "life_frame.png")
           var vs:Phaser.Sprite = new Phaser.Sprite(this.game, lifeBackground.x + lifeBackground.width+10,10, "ui", "versus.png")

           enemyLifeBackground.width = -enemyLifeBackground.width;

           this.uiBackground = new Phaser.Group(this.game);

           this.uiBackground.add(lifeBackground);
           this.uiBackground.add(enemyLifeBackground);
           this.uiBackground.add(vs);

           this.uiBackground.fixedToCamera = true;
       }

       createEnergyCells(){
           this.cellsGroup = new Phaser.Group(this.game);
           this.cellsGroup.fixedToCamera = true;

            for(var i=0; i<10; i++){
                var energyCell:Phaser.Sprite = new Phaser.Sprite(this.game, 5+i * 46,48, "ui", "energy_cell.png");
                this.cellsGroup.add(energyCell);
            }
       }

       createLife(){
           this.lifeGroup = new Phaser.Group(this.game);
           var lifeBar:Phaser.Sprite = new Phaser.Sprite(this.game, 0,0, "ui", "life_bar.png");
           var lifeBarEnemy:Phaser.Sprite = new Phaser.Sprite(this.game, 1328,0, "ui", "life_bar.png");
           lifeBarEnemy.width = -lifeBarEnemy.width;
           this.lifeGroup.add(lifeBar);
           this.lifeGroup.add(lifeBarEnemy);
           this.lifeGroup.fixedToCamera = true;
       }

       createActionsMenu(){
           this.actionsGroup = new Phaser.Group(this.game);
       }
    }
}