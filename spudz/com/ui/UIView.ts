/**
 * Created by adm on 06.11.15.
 */
module UserInterfaceModule{
    export class UIView extends MvcModule.View
    {

        static NAME:string = "UIView";
        uiBackground:Phaser.Group;
        cellsGroup:Phaser.Group;
        lifeGroup:Phaser.Group;
        actionsGroup:Phaser.Group;
        textsGroup:Phaser.Group;

        lifeBar:Phaser.Sprite;
        lifeBarEnemy:Phaser.Sprite;

        actionsMenuButton:Phaser.Sprite;
        btnDefence:Phaser.Sprite;
        btnMelee:Phaser.Sprite;
        btnRange:Phaser.Sprite;
        btnSkip:Phaser.Sprite;
        moveMenuButton:Phaser.Sprite;

        currentTarget:Phaser.Sprite;
        currentAction:string;

        constructor(){
            super(UIView.NAME);
            this.setUiBackground();
            this.createEnergyCells();
            this.createLife();
            this.createActionsMenu();
            this.updatePlayerNames();
        }

        setUiBackground(){
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
            this.actionsMenuButton.anchor.set(.5, .5);
            this.moveMenuButton = new Phaser.Sprite(this.game, 100, 100, "ui", "button.png");

            this.btnDefence = this.game.add.sprite(10,20,'btnDefence');
            this.btnMelee = this.game.add.sprite(60,20,'btnMelee');
            this.btnRange = this.game.add.sprite(110,20,'btnRange');
            this.btnSkip = this.game.add.sprite(160,20,'btnSkip');

            this.btnDefence.anchor.set(.5,.5);
            this.btnDefence.scale.set(.5,.5);
            this.btnMelee.anchor.set(.5,.5);
            this.btnMelee.scale.set(.5,.5);
            this.btnRange.anchor.set(.5,.5);
            this.btnRange.scale.set(.5,.5);
            this.btnSkip.anchor.set(.5,.5);
            this.btnSkip.scale.set(.5,.5);

            //this.actionsGroup.fixedToCamera = true;
            this.actionsGroup.add(this.actionsMenuButton);
            this.actionsGroup.add(this.moveMenuButton);
            this.actionsGroup.add(this.btnDefence);
            this.actionsGroup.add(this.btnMelee);
            this.actionsGroup.add(this.btnRange);
            this.actionsGroup.add(this.btnSkip);

            this.actionsMenuButton.inputEnabled = true;
            this.btnDefence.inputEnabled = true;
            this.btnMelee.inputEnabled = true;
            this.btnRange.inputEnabled = true;
            this.btnSkip.inputEnabled = true;

            this.actionsMenuButton.events.onInputDown.add(this.menuButtonTouched, this);
            this.btnDefence.events.onInputDown.add(this.defenceButtonTouched, this);
            this.btnMelee.events.onInputDown.add(this.meleeButtonTouched, this);
            this.btnRange.events.onInputDown.add(this.rangeButtonTouched, this);
            this.btnSkip.events.onInputDown.add(this.skipButtonTouched, this);
        }

        menuButtonTouched(){
            //this.updateLife(50);
            //this.updateEnemyLife(50);
            //this.actionsGroup.visible = false;
            if(this.btnDefence.visible)
            {
                this.btnDefence.visible = false;
                this.btnMelee.visible = false;
                this.btnRange.visible = false;
                this.btnSkip.visible = false;
            }
            else
            {
                this.btnDefence.visible = true;
                this.btnMelee.visible = true;
                this.btnRange.visible = true;
                this.btnSkip.visible = true;
            }
        }

        defenceButtonTouched(){
            this.hideAll();
            this.currentAction = CharacterModule.CharacterActionType.DEFENCE;
            this.dispatchSignal("sendAction", this.currentAction);
        }

        hideAll()
        {
            this.actionsMenuButton.visible = true;
            this.btnDefence.visible = true;
            this.btnMelee.visible = true;
            this.btnRange.visible = true;

            this.btnMelee.alpha = 1;
            this.btnRange.alpha = 1;
            this.btnMelee.inputEnabled = true;
            this.btnRange.inputEnabled = true;
            this.actionsGroup.visible = false;
        }


        meleeButtonTouched(){
            this.hideAll();
            this.currentAction = CharacterModule.CharacterActionType.MELEE;
            this.dispatchSignal("sendAction", this.currentAction);
        }

        rangeButtonTouched(){
            this.hideAll();
            this.currentAction = CharacterModule.CharacterActionType.RANGE;
            this.dispatchSignal("sendAction", this.currentAction);
        }

        skipButtonTouched(){
            this.hideAll();
            this.currentAction = CharacterModule.CharacterActionType.SKIP;
            this.dispatchSignal("sendAction", this.currentAction);
        }

        updateLife(amount:number){
            this.lifeBar.x -= amount;
        }

        updateEnemyLife(amount:number){
            this.lifeBarEnemy.x += amount;
        }

        showActionsMenu(target:Phaser.Sprite){

            this.hideMoveMenu();

            this.currentTarget = target;

            this.actionsGroup.visible = true;

            this.actionsMenuButton.x = target.x;
            this.actionsMenuButton.y = target.y - 140;

            this.btnDefence.x = this.actionsMenuButton.x  - 120;
            this.btnDefence.y = this.actionsMenuButton.y;

            this.btnMelee.x = this.actionsMenuButton.x + 120;
            this.btnMelee.y = this.actionsMenuButton.y;

            this.btnRange.x = this.actionsMenuButton.x;
            this.btnRange.y = this.actionsMenuButton.y - 110;

            this.btnSkip.x = this.actionsMenuButton.x - 240;
            this.btnSkip.y = this.actionsMenuButton.y;

            this.actionsMenuButton.inputEnabled = true;
        }

        disableMeleeButton(){
            this.btnMelee.alpha = 0.5;
            this.btnMelee.inputEnabled = false;
        }

        disableRangeButton(){
            this.btnRange.alpha = 0.5;
            this.btnRange.inputEnabled = false;
        }

        hideActionsMenu(){
            this.hideAll();
        }

        showMoveMenu(target:Phaser.Sprite){
            this.currentTarget = target;

            this.actionsGroup.visible = true;

            this.btnSkip.x = target.x;
            this.btnSkip.y = target.y - CharacterModule.ActionRayView.MOVE_RAY * GridModule.GridView.tileWidth - 50;

            this.actionsMenuButton.visible = false;
            this.btnDefence.visible = false;
            this.btnMelee.visible = false;
            this.btnRange.visible = false;

            this.actionsMenuButton.inputEnabled = true;
        }

        hideMoveMenu(){
            this.hideAll();
        }

        updateEnergy(amount:number){
            console.log("update energy: "+amount);
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

        drainEnergy(){
            if(this.cellsGroup.length>0) {
                this.cellsGroup.removeChildAt(this.cellsGroup.length - 1)
            }
        }
    }
}