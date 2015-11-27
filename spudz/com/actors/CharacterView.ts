/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterView extends MvcModule.View{

        static NAME:string = "CharacterView";

        graphics:Phaser.Sprite;

        speed = 1000;

        tween:Phaser.Tween;
        tweenObject:Phaser.Sprite;

        moving:boolean = false;
        attackComplete:boolean = false;

        currentAction:string = CharacterModule.CharacterActionType.MOVE;
        currentAnimation:string = "";
        attackAction:string = "";
        currentDamage:number;

        characterName:string;

        enemyGraphics:Phaser.Sprite;

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

            this.tweenObject  = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("SmallRectangleBMP"));
            this.tweenObject.alpha = 0;
        }

        createCharacter(characterName:string, x:number, y:number, followCharacter:boolean)
        {
            this.characterName = characterName;

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

            this.graphics.anchor.setTo(0.5, 0.5);

            this.game.physics.enable(this.graphics, Phaser.Physics.ARCADE);

            this.graphics.body.immovable = true;
            this.graphics.body.collideWorldBounds = true;
            this.graphics.body.gravity.y = 400;

            //TODO - set correct size for each character
            this.graphics.body.setSize(this.graphics.width/2, this.graphics.height, this.graphics.width/4, 0);

            if(followCharacter == true)
            {
                this.game.camera.follow(this.graphics);
            }

            if(!this.graphics.body.onFloor())
            {
                this.animateJump();
            }
        }

        updateEnemy(enemy:Phaser.Sprite)
        {
            this.enemyGraphics = enemy;
        }

        checkCollisionWithMap(layers:Array<Phaser.TilemapLayer>){
            for(var i = 0; i < layers.length; i++)
            {
                this.game.physics.arcade.collide(this.graphics, layers[i]);
            }
        }

        startMoving(x:number, y:number, width:number, height:number)
        {
            if(y >= (this.graphics.body.position.y - this.graphics.height/2))
            {
                this.animateWalk();
                y = this.graphics.position.y;
            }
            else
            {
                this.animateJump();
            }

            if(x < this.graphics.x)
            {
                this.graphics.scale.x = -1;
                this.graphics.body.position.x -= this.graphics.width;

            }
            else
            {
                this.graphics.scale.x = 1;
                this.graphics.body.position.x += this.graphics.width;
            }

            this.tweenObject.x = x;
            this.tweenObject.y = y;

            var distance = this.game.physics.arcade.distanceBetween(this.graphics, this.tweenObject);
            var tweenDuration = distance/this.speed;

            this.tweenObject.x = this.graphics.x;
            this.tweenObject.y = this.graphics.y;

            this.tween = this.game.add.tween(this.tweenObject).to(
                {   x: x,
                    y: y
                }, tweenDuration * 1000, "Linear", true);

            this.tween.onComplete.removeAll();
            this.tween.onComplete.add( this.moveComplete ,this);

            this.tween.start();

            this.moving = true;

            this.game.physics.arcade.moveToXY(this.graphics, x, y, 700);

        }

        moveComplete()
        {
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.graphics.body.gravity.y = 0;
            this.setCurrentAction(CharacterModule.CharacterActionType.ATTACK);
            this.animateIdle();
            this.moving = false;
        }

        setCharacterAttackAction(attackAction:string)
        {
            this.attackAction = attackAction;
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

        waitToMove:boolean;

        characterTurn()
        {
            this.attackAction = "";
            this.graphics.body.gravity.y = 400;

            if(!this.graphics.body.onFloor())
            {
                this.waitToMove = true;
                this.animateJump();
            }
            else
            {
                this.waitToMove = false;
                this.setCurrentAction(CharacterModule.CharacterActionType.MOVE);
            }
        }

        updateCharacter() {

            if(MapModule.Map.getInstance().layers['Spudz'])
            {
                this.checkCollisionWithMap([
                    MapModule.Map.getInstance().layers['Spudz']['TilesLayer'],
                    MapModule.Map.getInstance().layers['Spudz']['Tiles2Layer']
                ]);
            }

            if(this.graphics.body.onFloor())
            {
                //if landing when physics resume, change action
                if(this.waitToMove)
                {
                    this.waitToMove = false;
                    this.setCurrentAction(CharacterModule.CharacterActionType.MOVE);
                }
                if(this.currentAnimation == CharacterModule.CharacterAnimations.JUMP_ANIMATION)
                {
                    SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["land"]);
                }
            }
            //else
            //{
            //    if(this.currentAnimation == CharacterModule.CharacterAnimations.RUN_ANIMATION)
            //    {
            //        this.animateJump();
            //    }
            //}

            if(this.currentAction == CharacterModule.CharacterActionType.MOVE &&
                this.currentAnimation != CharacterModule.CharacterAnimations.IDLE_ANIMATION)
            {
                if(this.graphics.body.velocity.x == 0 && this.graphics.body.velocity.y == 0)
                {
                    this.animateIdle();
                }
            }
        }

        startMovingWhenHit()
        {
            var newX = 0;
            if(this.enemyGraphics.x < this.graphics.x)
            {
                //move right
                //TODO - get tile height
                newX = this.graphics.x + 40;
                this.graphics.scale.x = -1;
                this.graphics.body.position.x -= this.graphics.width;
            }
            else
            {
                //move left
                //TODO - get tile height
                newX = this.graphics.x - 40;
                this.graphics.scale.x = 1;
                this.graphics.body.position.x += this.graphics.width;
            }

            this.tweenObject.x = newX;
            this.tweenObject.y = this.graphics.y;

            var distance = this.game.physics.arcade.distanceBetween(this.graphics, this.tweenObject);
            var tweenDuration = distance/this.speed;

            this.tweenObject.x = this.graphics.x;
            this.tweenObject.y = this.graphics.y;

            this.tween = this.game.add.tween(this.tweenObject).to(
                {   x: newX,
                }, tweenDuration * 2 * 1000, "Linear", true);

            this.tween.onComplete.removeAll();
            this.tween.onComplete.add( this.moveHitComplete ,this);

            this.tween.start();

            this.game.physics.arcade.moveToXY(this.graphics, newX, this.graphics.y, 350);
        }

        moveHitComplete()
        {
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
        }

////////////////////////////////////


        animateWalk(){
            SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["run"]);
            this.graphics.play(CharacterModule.CharacterAnimations.RUN_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.RUN_ANIMATION;

        }

        animateJump(){
            SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["jump"]);
            this.graphics.play(CharacterModule.CharacterAnimations.JUMP_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.JUMP_ANIMATION;
        }

        animateIdle()
        {
            this.graphics.play(CharacterModule.CharacterAnimations.IDLE_ANIMATION);
            this.currentAnimation = CharacterModule.CharacterAnimations.IDLE_ANIMATION;
        }

        animateBlock(){
            SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["block"]);
            this.graphics.play(CharacterModule.CharacterAnimations.BLOCK_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.BLOCK_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateMelee(){
            SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["melee"]);

            this.graphics.play(CharacterModule.CharacterAnimations.MELEE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.MELEE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateRange(){
            SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["range"]);

            this.graphics.play(CharacterModule.CharacterAnimations.RANGE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.RANGE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateUltimate(){
            SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["ultimate"]);

            this.graphics.play(CharacterModule.CharacterAnimations.ULTIMATE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.ULTIMATE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
        }

        animateHit(){
            SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["damage"]);

            this.graphics.play(CharacterModule.CharacterAnimations.DAMAGE_ANIMATION, 30, false);
            this.currentAnimation = CharacterModule.CharacterAnimations.DAMAGE_ANIMATION;
            this.graphics.events.onAnimationComplete.add(this.onDamageComplete, this);
        }

        onAttackComplete()
        {
            this.graphics.events.onAnimationComplete.removeAll();
            this.attackComplete = true;
            if(this.currentAnimation != CharacterModule.CharacterAnimations.BLOCK_ANIMATION)
            {
                this.animateIdle();
                this.dispatchSignal("AttackOpponent");
            }
            else if(this.currentAction != CharacterModule.CharacterAnimations.DAMAGE_ANIMATION)
            {
                this.sendToServer();
            }
        }

        onDamageComplete()
        {
            this.graphics.events.onAnimationComplete.removeAll();
            if(this.currentAnimation == CharacterModule.CharacterAnimations.DAMAGE_ANIMATION)
            {
                this.dispatchSignal("CharacterDamageComplete", this.currentDamage);
                this.animateIdle();
            }
        }

        setCurrentAction(currentAction:string)
        {
            this.currentAction = currentAction;
            this.sendPosition();
        }

        sendPosition()
        {
            this.dispatchSignal("CharacterPosition", {  x: this.graphics.x,
                                                        y: this.graphics.y,
                                                        actionType: this.currentAction,
                                                        addActionRay:true});
        }

        sendToServer()
        {
            this.dispatchSignal("SendMoveToServer");
        }
    }
}