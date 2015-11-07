/**
 * Created by adm on 04.11.15.
 */
module GameControllerModule{
    export class GameController{
        private static _instance:GameController = new GameController();

        public game:Phaser.Game;
        public inputOngoing:boolean = false;
        public isPaused:boolean = false;
        public tweens:Array<Phaser.Tween> = new Array();

        constructor(){
            if(GameController._instance){
                throw new Error("Te Dreq: Instantiation failed: Use GameController.getInstance()");
            }
            GameController._instance = this;
        }

        public static getInstance():GameController {
            return GameController._instance;
        }

        pausePhysics(value:boolean){
            this.isPaused = value;
            this.game.physics.arcade.isPaused = value;
        }

        pauseTweens(value:boolean) {
            for(var i=0; i<this.tweens.length; i++)
            {
                this.tweens[i].isPaused = value;
            }
        }

        pauseAll(value:boolean){
            this.pausePhysics(value);
            this.pauseTweens(value);
        }
    }

}