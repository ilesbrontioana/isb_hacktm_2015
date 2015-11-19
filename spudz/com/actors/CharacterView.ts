/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterView extends MvcModule.View{

        static NAME:string = "CharacterView";

        graphics:Phaser.Sprite;

        speed = 1000;

        //verticalRectangle:Phaser.Sprite;
        //horizontalRectangle:Phaser.Sprite;

        tween:Phaser.Tween;
        tweenObject:Phaser.Sprite;

        moving:boolean = false;

        initial:boolean = true;
        attackComplete:boolean = false;

        currentAction:string = CharacterModule.CharacterActionType.MOVE;
        currentAnimation:string = "";
        attackAction:string = "";

        collideWithMapLayers:boolean;

        characterName:string;

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
            //this.verticalRectangle  = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("SmallRectangleBMP"));
            //this.horizontalRectangle  = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("SmallRectangleBMP"));
            //this.verticalRectangle.alpha = 0;
            //this.horizontalRectangle.alpha = 0;
            //this.horizontalRectangle.width = 2000;
            //this.verticalRectangle.height = 1400;

            //this.game.physics.enable(this.horizontalRectangle, Phaser.Physics.ARCADE);
            //this.game.physics.enable(this.verticalRectangle, Phaser.Physics.ARCADE);
            //
            //this.horizontalRectangle.body.immovable = true;
            //this.verticalRectangle.body.immovable = true;
        }

        createCharacter(characterName:string)
        {
            this.characterName = characterName;

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

            this.graphics.body.immovable = true;

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
            //this.game.physics.arcade.collide(this.graphics, this.verticalRectangle, this.moveComplete, null, this);
            //this.game.physics.arcade.collide(this.graphics, this.horizontalRectangle, this.moveComplete, null, this);

        }

        collideWithMap()
        {
            this.collideWithMapLayers = true;
            if(this.currentAnimation == CharacterModule.CharacterAnimations.JUMP_ANIMATION)
            {
                SoundsModule.SoundsManager.getInstance().playSound(CharacterModule.CharacterAnimationsSounds.sounds[this.characterName]["land"]);
            }
        }

        startMoving(x:number, y:number, width:number, height:number)
        {
            //this.verticalRectangle.x = x + width/2;
            //this.horizontalRectangle.y = y + height/2;

            if(y >= (this.graphics.y - this.graphics.height) && y < (this.graphics.y + this.graphics.height))
            {
                this.animateWalk();
                if(x < this.graphics.x)
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

            this.tweenObject.x = x;
            this.tweenObject.y = y;

            //this.game.physics.arcade.moveToXY(this.graphics, x, y, 700);
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

            //this.graphics.body.gravity.y = 0;

            this.game.physics.arcade.moveToXY(this.graphics, x, y, 700);

        }

        moveComplete()
        {
            //this.verticalRectangle.x = 0;
            //this.horizontalRectangle.y = 0;
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.graphics.body.gravity.y = 0;
            this.setCurrentAction(CharacterModule.CharacterActionType.ATTACK);
            this.animateIdle();
            this.sendToServer();
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

        characterTurn()
        {
            this.attackAction = "";
            this.graphics.body.gravity.y = 400;
            this.setCurrentAction(CharacterModule.CharacterActionType.MOVE);
        }

        updateCharacter() {

            if(this.moving)
            {
                //this.graphics.body.position.x = this.tweenObject.x;
                //this.graphics.body.position.y = this.tweenObject.y;

                //this.graphics.body.velocity.x -= 30;
                //this.graphics.body.velocity.y -= 30;

            }
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
                    this.animateIdle();
                }
            }
        }

        animateTakeDamage(body:any)
        {

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
            this.graphics.events.onAnimationComplete.add(this.onAttackComplete, this);
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