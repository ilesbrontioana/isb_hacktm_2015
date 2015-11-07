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
           textsGroup:Phaser.Group;

           lifeBar:Phaser.Sprite;
           lifeBarEnemy:Phaser.Sprite;

           actionsMenuButton:Phaser.Sprite;
           moveMenuButton:Phaser.Sprite;

        constructor(){
            this.game = GameControllerModule.GameController.getInstance().game;
            this.uiBackground();
            this.createEnergyCells();
            this.createLife();
            this.createActionsMenu();
            this.updatePlayerNames();
        }

       uiBackground(){
           var lifeBackground:Phaser.Sprite = new Phaser.Sprite(this.game, 0,0, "ui", "life_frame.png")
           var enemyLifeBackground:Phaser.Sprite = new Phaser.Sprite(this.game, 1337,0, "ui", "life_frame.png")
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
           this.lifeBar = new Phaser.Sprite(this.game, 0,0, "ui", "life_bar.png");
           this.lifeBarEnemy = new Phaser.Sprite(this.game, 1337,0, "ui", "life_bar.png");
           this.lifeBarEnemy.width = -this.lifeBarEnemy.width;
           this.lifeGroup.add(this.lifeBar);
           this.lifeGroup.add(this.lifeBarEnemy);
           this.lifeGroup.fixedToCamera = true;
       }

       createActionsMenu(){
           this.actionsGroup = new Phaser.Group(this.game);
           this.actionsMenuButton = new Phaser.Sprite(this.game, 100, 100, "ui", "button.png");
           this.moveMenuButton = new Phaser.Sprite(this.game, 100, 100, "ui", "button.png");

           this.actionsGroup.fixedToCamera = true;
           this.actionsGroup.add(this.actionsMenuButton);
           this.actionsGroup.add(this.moveMenuButton);

           this.actionsMenuButton.inputEnabled = true;
           this.actionsMenuButton.events.onInputDown.add(this.menuButtonTouched, this);
       }

       menuButtonTouched(){
           this.updateLife(50);
           this.updateEnemyLife(50);
           this.actionsGroup.visible = false;
       }

       updateLife(amount:number){
            this.lifeBar.x -= amount;
       }

       updateEnemyLife(amount:number){
            this.lifeBarEnemy.x += amount;
       }

       showActionsMenu(){
           this.actionsGroup.visible = true;
       }

       hideActionsMenu(){
           this.actionsGroup.visible = false;
       }

       showMoveMenu(){

       }

       hideMoveMenu(){

       }

       updatePlayerNames(){
           this.textsGroup = new Phaser.Group(this.game);
           var currentPlayerNameText = this.game.add.bitmapText(10, 5, 'font','Gheorghe',30);
           var opponentPlayerNameText = this.game.add.bitmapText(1000, 5, 'font','Vasile',30);

           opponentPlayerNameText.x = 1334 - opponentPlayerNameText.width - 10;

           this.textsGroup.add(currentPlayerNameText);
           this.textsGroup.add(opponentPlayerNameText);

           this.textsGroup.fixedToCamera = true;
       }
    }
}