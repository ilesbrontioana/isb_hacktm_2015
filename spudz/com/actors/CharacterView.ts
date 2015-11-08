/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterView extends MvcModule.View{
        graphics;

        speed = 1000;

        verticalRectangle;
        horizontalRectangle;

        currentAction = CharacterModule.CharacterActionType.ATTACK;

        constructor() {
            super();

            this.createCharacter('pirate', 640, 300, true);

            this.createBitmapDataRectangles();

            EventsModule.SignalsManager.getInstance().createBinding("CharacterPosition", function(){
            }, this);
        }

        createBitmapDataRectangles()
        {
            var bmd = GameControllerModule.GameController.getInstance().game.add.bitmapData(4, 4);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0,0,4,4);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            GameControllerModule.GameController.getInstance().game.cache.addBitmapData("SmallRectangleBMP", bmd);

            this.verticalRectangle  = GameControllerModule.GameController.getInstance().game.add.sprite(0, 0, GameControllerModule.GameController.getInstance().game.cache.getBitmapData("SmallRectangleBMP"));
            this.horizontalRectangle  = GameControllerModule.GameController.getInstance().game.add.sprite(0, 0, GameControllerModule.GameController.getInstance().game.cache.getBitmapData("SmallRectangleBMP"));
            this.verticalRectangle.alpha = 0;
            this.horizontalRectangle.alpha = 0;
            this.horizontalRectangle.width = 2000;
            this.verticalRectangle.height = 1400;

            GameControllerModule.GameController.getInstance().game.physics.enable(this.horizontalRectangle, Phaser.Physics.ARCADE);
            GameControllerModule.GameController.getInstance().game.physics.enable(this.verticalRectangle, Phaser.Physics.ARCADE);

            this.horizontalRectangle.body.immovable = true;
            this.verticalRectangle.body.immovable = true;
        }

        createCharacter(characterName, x, y, followCharacter = false)
        {

            this.graphics = GameControllerModule.GameController.getInstance().game.add.sprite(x, y, characterName);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.IDLE_ANIMATION, Phaser.Animation.generateFrameNames('idle_pirate', 0, 18, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.JUMP_ANIMATION, Phaser.Animation.generateFrameNames('jump_pirate', 0, 24, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.MELEE_ANIMATION, Phaser.Animation.generateFrameNames('melee_pirate 2_frame_', 1, 23, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.RUN_ANIMATION, Phaser.Animation.generateFrameNames('pirate_run', 0, 15, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.RANGE_ANIMATION, Phaser.Animation.generateFrameNames('range_pirate', 0, 42, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.DAMAGE_ANIMATION, Phaser.Animation.generateFrameNames('Layer ', 0, 12, '', 4), 30, true);


            //this.graphics.animations.add(CharacterModule.CharacterAnimations.IDLE_ANIMATION, Phaser.Animation.generateFrameNames('idle_space', 0, 18, '', 4), 30, true);
            //this.graphics.animations.add(CharacterModule.CharacterAnimations.JUMP_ANIMATION, Phaser.Animation.generateFrameNames('jump_space', 0, 24, '', 4), 30, true);
            //this.graphics.animations.add(CharacterModule.CharacterAnimations.MELEE_ANIMATION, Phaser.Animation.generateFrameNames('melee_space', 1, 23, '', 4), 30, true);
            //this.graphics.animations.add(CharacterModule.CharacterAnimations.RUN_ANIMATION, Phaser.Animation.generateFrameNames('space_run', 0, 15, '', 4), 30, true);
            //this.graphics.animations.add(CharacterModule.CharacterAnimations.RANGE_ANIMATION, Phaser.Animation.generateFrameNames('range_space', 0, 42, '', 4), 30, true);
            //this.graphics.animations.add(CharacterModule.CharacterAnimations.DAMAGE_ANIMATION, Phaser.Animation.generateFrameNames('Hit_space', 0, 12, '', 4), 30, true);

            //this.animateIdle();

            GameControllerModule.GameController.getInstance().game.physics.enable(this.graphics, Phaser.Physics.ARCADE);

            this.graphics.body.collideWorldBounds = true;
            this.graphics.body.gravity.y = 400;

            this.graphics.body.speed = this.speed;

            this.graphics.body.setSize(50, this.graphics.height, this.graphics.width/2 - 30, 0);

            if(followCharacter == true)
            {
                GameControllerModule.GameController.getInstance().game.camera.follow(this.graphics);
            }
        }

        checkCollision(map){
            this.collide = false;
            for(var i = 0; i < map.length; i++)
            {
                GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, map[i], this.collideWithMap, null, this);
            }
            if(!this.collide)
            {
                if(this.currentAnimation == CharacterModule.CharacterAnimations.RUN_ANIMATION)
                {
                    this.animateJump();
                }
            }
            GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, this.verticalRectangle, this.collideWithRectangle, null, this);
            GameControllerModule.GameController.getInstance().game.physics.arcade.collide(this.graphics, this.horizontalRectangle, this.collideWithRectangle, null, this);

        }

        collide;

        collideWithMap()
        {
           this.collide = true;
        }

        collideWithRectangle()
        {
            this.verticalRectangle.x = 0;
            this.horizontalRectangle.y = 0;
            //this.graphics.body.gravity.y = 0;
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.game.physics.arcade.isPaused = true;
        }

        moveCharacter(tile)
        {
            this.graphics.body.gravity.y = 400;
            this.verticalRectangle.x = tile.x - tile.width/2;
            this.horizontalRectangle.y = tile.y - tile.height/2;

            if(tile.y >= (this.graphics.y - this.graphics.height) && tile.y < (this.graphics.y + this.graphics.height))
            {
                this.animateWalk();
                if(tile.x < this.graphics.x)
                {
                    this.graphics.scale.x = -1;
                }
                else
                {
                    this.graphics.scale.x = 1;
                }
            }
            else
            {
                this.animateJump();
            }

            GameControllerModule.GameController.getInstance().game.physics.arcade.moveToXY(this.graphics, tile.x, tile.y, 700);
        }

        updateCharacter() {
            if(this.currentAnimation != CharacterModule.CharacterAnimations.IDLE_ANIMATION)
            {
                if(this.graphics.body.velocity.x == 0 && this.graphics.body.velocity.y == 0)
                {
                    this.animateIdle();
                }
            }

        }
////////////////////////////////////

        currentAnimation = "";

        animateWalk(){
            this.graphics.play(CharacterModule.CharacterAnimations.RUN_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.RUN_ANIMATION;

        }

        animateJump(){
            this.graphics.play(CharacterModule.CharacterAnimations.JUMP_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.JUMP_ANIMATION;
        }

        animateBlock(){
        }

        animateMelee(){

            this.graphics.play(CharacterModule.CharacterAnimations.MELEE_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.MELEE_ANIMATION;
        }

        animateRange(){
            this.graphics.play(CharacterModule.CharacterAnimations.RANGE_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.RANGE_ANIMATION;
        }

        animateUltimate(){

        }

        animateIdle()
        {
            this.setCurrentAction();

            this.graphics.play(CharacterModule.CharacterAnimations.IDLE_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.IDLE_ANIMATION;
        }

        setCurrentAction()
        {
            if(this.currentAction == CharacterActionType.ATTACK)
            {
                this.currentAction = CharacterActionType.MOVE;
            }
            else
            {
                this.currentAction = CharacterActionType.ATTACK;
            }
            this.dispatchSignal("CharacterPosition", {  x: this.graphics.x + this.graphics.width/2,
                                                        y: this.graphics.y + this.graphics.height/2,
                                                        actionType: this.currentAction});
        }
    }
}