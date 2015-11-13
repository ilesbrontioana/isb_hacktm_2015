/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterView extends MvcModule.View{

        static NAME:string = "CharacterView";

        graphics:Phaser.Sprite;

        speed = 1000;

        verticalRectangle:Phaser.Sprite;
        horizontalRectangle:Phaser.Sprite;

        initial:Boolean = true;
        attackComplete:Boolean = false;

        currentAction:string = CharacterModule.CharacterActionType.MOVE;
        currentAnimation:string = "";

        collideWithMapLayers:Boolean;

        constructor() {
            super(CharacterView.NAME);

            this.createBitmapDataRectangles();
        }

        createBitmapDataRectangles()
        {
            var bmd = this.game.add.bitmapData(4, 4);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.fillRect(0,0,4,4);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            this.game.cache.addBitmapData("SmallRectangleBMP", bmd);

            this.verticalRectangle  = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("SmallRectangleBMP"));
            this.horizontalRectangle  = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("SmallRectangleBMP"));
            this.verticalRectangle.alpha = 0;
            this.horizontalRectangle.alpha = 0;
            this.horizontalRectangle.width = 2000;
            this.verticalRectangle.height = 1400;

            this.game.physics.enable(this.horizontalRectangle, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.verticalRectangle, Phaser.Physics.ARCADE);

            this.horizontalRectangle.body.immovable = true;
            this.verticalRectangle.body.immovable = true;
        }

        createCharacter(characterName:string)
        {
            var x = 680;
            var y = 1244;
            var followCharacter = true;

            this.graphics = this.game.add.sprite(x, y, characterName);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.IDLE_ANIMATION, Phaser.Animation.generateFrameNames(
                            CharacterModule.CharacterAnimationsAssets.assets[characterName][CharacterModule.CharacterAnimations.IDLE_ANIMATION],
                            0, 18, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.JUMP_ANIMATION, Phaser.Animation.generateFrameNames(
                            CharacterModule.CharacterAnimationsAssets.assets[characterName][CharacterModule.CharacterAnimations.JUMP_ANIMATION],
                            0, 24, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.MELEE_ANIMATION, Phaser.Animation.generateFrameNames(
                            CharacterModule.CharacterAnimationsAssets.assets[characterName][CharacterModule.CharacterAnimations.MELEE_ANIMATION],
                            1, 23, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.RUN_ANIMATION, Phaser.Animation.generateFrameNames(
                            CharacterModule.CharacterAnimationsAssets.assets[characterName][CharacterModule.CharacterAnimations.RUN_ANIMATION],
                            0, 15, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.RANGE_ANIMATION, Phaser.Animation.generateFrameNames(
                            CharacterModule.CharacterAnimationsAssets.assets[characterName][CharacterModule.CharacterAnimations.RANGE_ANIMATION],
                            0, 42, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.DAMAGE_ANIMATION, Phaser.Animation.generateFrameNames(
                            CharacterModule.CharacterAnimationsAssets.assets[characterName][CharacterModule.CharacterAnimations.DAMAGE_ANIMATION],
                            0, 12, '', 4), 30, true);
            this.graphics.animations.add(CharacterModule.CharacterAnimations.BLOCK_ANIMATION, Phaser.Animation.generateFrameNames(
                            CharacterModule.CharacterAnimationsAssets.assets[characterName][CharacterModule.CharacterAnimations.BLOCK_ANIMATION],
                            0, 21, '', 4), 30, true);

            this.game.physics.enable(this.graphics, Phaser.Physics.ARCADE);

            this.graphics.body.collideWorldBounds = true;
            this.graphics.body.gravity.y = 400;

            this.graphics.body.speed = this.speed;

            this.graphics.body.setSize(50, this.graphics.height, this.graphics.width/2 - 30, 0);

            if(followCharacter == true)
            {
                this.game.camera.follow(this.graphics);
            }
        }

        checkCollision(layers:Array<Phaser.TilemapLayer>){
            this.collideWithMapLayers = false;
            for(var i = 0; i < layers.length; i++)
            {
                this.game.physics.arcade.collide(this.graphics, layers[i], this.collideWithMap, null, this);
            }
            if(!this.collideWithMapLayers)
            {
                if(this.currentAnimation == CharacterModule.CharacterAnimations.RUN_ANIMATION)
                {
                    this.animateJump();
                }
            }
            this.game.physics.arcade.collide(this.graphics, this.verticalRectangle, this.collideWithRectangle, null, this);
            this.game.physics.arcade.collide(this.graphics, this.horizontalRectangle, this.collideWithRectangle, null, this);

        }

        collideWithMap()
        {
           this.collideWithMapLayers = true;
        }

        collideWithRectangle()
        {
            this.verticalRectangle.x = 0;
            this.horizontalRectangle.y = 0;
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.game.physics.arcade.isPaused = true;
            this.setCurrentAction(CharacterModule.CharacterActionType.ATTACK);
            this.animateIdle();
        }

        startAction(tile:Phaser.Sprite)
        {
            if(this.currentAction == CharacterModule.CharacterActionType.MOVE)
            {
                this.graphics.body.gravity.y = 400;
                this.verticalRectangle.x = tile.x + tile.width/2;
                this.horizontalRectangle.y = tile.y + tile.height/2;

                if(tile.y >= (this.graphics.y - this.graphics.height) && tile.y < (this.graphics.y + this.graphics.height))
                {
                    this.animateWalk();
                    if(tile.x < this.graphics.x)
                    {
                        this.graphics.scale.x = -1;
                        this.graphics.body.setSize(50, this.graphics.height, -this.graphics.width + this.graphics.width/2 - 30, 0);

                    }
                    else
                    {
                        this.graphics.scale.x = 1;
                        this.graphics.body.setSize(50, this.graphics.height, this.graphics.width/2 - 30, 0);
                    }
                }
                else
                {
                    this.animateJump();
                }

                this.game.physics.arcade.moveToXY(this.graphics, tile.x, tile.y, 700);
            }

        }

        setCharacterAttackAction(attackAction:string)
        {
            //TODO - set direction
            if(attackAction == CharacterActionType.MELEE)
            {
                this.animateMelee();
            }
            else if(attackAction == CharacterActionType.DEFENCE)
            {
                this.animateBlock();
            }
            else if(attackAction == CharacterActionType.RANGE)
            {
                this.animateRange();
            }
            else if(attackAction == CharacterActionType.SKIP) {

                this.onAttackComplete();
            }
        }

        characterTurn()
        {
            this.game.physics.arcade.isPaused = false;
            this.setCurrentAction(CharacterModule.CharacterActionType.MOVE);
        }

        updateCharacter() {
            if(MapModule.Map.getInstance().layers['Spudz'])
            {
                this.checkCollision([
                    MapModule.Map.getInstance().layers['Spudz']['TilesLayer'],
                    MapModule.Map.getInstance().layers['Spudz']['Tiles2Layer']
                ]);
            }

            if(this.currentAction == CharacterModule.CharacterActionType.MOVE &&
                this.currentAnimation != CharacterModule.CharacterAnimations.IDLE_ANIMATION)
            {
                if(this.graphics.body.velocity.x == 0 && this.graphics.body.velocity.y == 0)
                {
                    if(this.initial)
                    {
                        this.currentAction = CharacterModule.CharacterActionType.ATTACK;
                        this.initial = false;
                    }
                    else
                    {
                        this.sendToServer();
                    }
                    this.animateIdle();
                }
            }
            else if(this.currentAction == CharacterModule.CharacterActionType.ATTACK &&
                this.currentAnimation != CharacterModule.CharacterAnimations.IDLE_ANIMATION)
            {
                if(this.attackComplete)
                {

                    if(this.currentAnimation != CharacterModule.CharacterAnimations.BLOCK_ANIMATION)
                    {
                        this.animateIdle();
                        this.dispatchSignal("AttackOpponent");
                    }
                    else if(this.currentAction != CharacterModule.CharacterAnimations.DAMAGE_ANIMATION)
                    {
                        this.sendToServer();
                    }
                    this.attackComplete = false;

                }
            }

        }

        animateTakeDamage(body:any)
        {

        }

////////////////////////////////////


        animateWalk(){
            this.graphics.play(CharacterModule.CharacterAnimations.RUN_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.RUN_ANIMATION;

        }

        animateJump(){
            this.graphics.play(CharacterModule.CharacterAnimations.JUMP_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.JUMP_ANIMATION;
        }

        animateIdle()
        {
            this.graphics.play(CharacterModule.CharacterAnimations.IDLE_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.IDLE_ANIMATION;
        }

        animateBlock(){
            this.graphics.play(CharacterModule.CharacterAnimations.BLOCK_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.BLOCK_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateMelee(){
            this.graphics.play(CharacterModule.CharacterAnimations.MELEE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.MELEE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateRange(){
            this.graphics.play(CharacterModule.CharacterAnimations.RANGE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.RANGE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateUltimate(){

            this.graphics.play(CharacterModule.CharacterAnimations.ULTIMATE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.ULTIMATE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateHit(){

            this.graphics.play(CharacterModule.CharacterAnimations.DAMAGE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.DAMAGE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        onAttackComplete()
        {
            this.graphics.events.onAnimationComplete.removeAll();
            this.attackComplete = true;
        }

        setCurrentAction(currentAction:string)
        {
            this.currentAction = currentAction;
            this.sendPosition();
        }

        sendPosition()
        {
            this.dispatchSignal("CharacterPosition", {  x: this.graphics.x + this.graphics.width/2,
                y: this.graphics.y + this.graphics.height/2,
                actionType: this.currentAction,
                addActionRay:true});
        }

        sendToServer()
        {
            this.dispatchSignal("CharacterInfoToServer");
        }
    }
}