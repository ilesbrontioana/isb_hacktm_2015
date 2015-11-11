/**
 * Created by adm on 05.11.15.
 */
module UserInterfaceModule{
    export class hud {

        game;
        uiBackground:Phaser.Group;

        constructor(){
            this.game = GraphicsModule.GraphicsManager.getInstance().game;
            this.uiBackground();
        }

        uiBackground(){
            var lifeBackground:Phaser.Sprite = new Phaser.Sprite(this.game, 0,0, "ui", "life_frame.png")
            var enemyLifeBackground:Phaser.Sprite = new Phaser.Sprite(this.game, 1308,0, "ui", "life_frame.png")
            enemyLifeBackground.width = -enemyLifeBackground.width;

            this.uiBackground = new Phaser.Group(this.game);

            this.uiBackground.add(lifeBackground);
            this.uiBackground.add(enemyLifeBackground);

            this.uiBackground.fixedToCamera = true;
        }
    }
}