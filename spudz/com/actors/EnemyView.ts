/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class EnemyView extends CharacterModule.CharacterView{

        constructor()
        {
            super();
        }

        onAttackComplete()
        {
            this.graphics.events.onAnimationComplete.removeAll();
            this.attackComplete = true;
            if(this.currentAnimation != CharacterModule.CharacterAnimations.BLOCK_ANIMATION)
            {
                this.animateIdle();
            }

            this.sendToServer();
        }



        setCharacterAttackAction(attackAction:string)
        {
            this.attackAction = attackAction;
        }

        moveComplete()
        {
            super.moveComplete();
            if(this.currentAction == CharacterModule.CharacterActionType.ATTACK)
            {
                if(this.attackAction == CharacterActionType.MELEE)
                {
                    this.animateMelee();
                }
                else if(this.attackAction == CharacterActionType.DEFENCE)
                {
                    this.animateBlock();
                }
                else if(this.attackAction == CharacterActionType.RANGE)
                {
                    this.animateRange();
                }
                else if(this.attackAction == CharacterActionType.SKIP)
                {
                    this.onAttackComplete();
                }
            }
        }

        sendPosition()
        {
            if(this.currentAction == CharacterModule.CharacterActionType.MOVE)
            {
                this.dispatchSignal("EnemyLandComplete");
            }
        }

        sendToServer()
        {
            this.dispatchSignal("OpponentActionsComplete");
        }

        tryDamage(circle:Phaser.Sprite)
        {
            this.currentDamage = 0;

            this.game.physics.arcade.overlap(this.graphics, circle, this.addDamage, null, this);
            if(this.currentDamage == 0)
            {
                this.dispatchSignal("CharacterDamage", this.currentDamage);
            }
        }

        addDamage()
        {
            this.startMovingWhenHit();
            if(this.currentAnimation != CharacterModule.CharacterAnimations.BLOCK_ANIMATION)
            {
                this.animateHit();
                this.currentAction = CharacterModule.CharacterActionType.DAMAGE;
                this.currentDamage = 10;
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

        onDamageComplete()
        {
            this.graphics.events.onAnimationComplete.removeAll();
            if(this.currentAnimation == CharacterModule.CharacterAnimations.DAMAGE_ANIMATION)
            {
                this.dispatchSignal("CharacterDamage", this.currentDamage);
                this.animateIdle();
            }
        }

    }
}