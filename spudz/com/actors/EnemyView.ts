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
            console.log(this.characterName + " enemy attack complete");
            this.graphics.events.onAnimationComplete.removeAll();
            this.attackComplete = true;
            if(this.currentAnimation != CharacterModule.CharacterAnimations.BLOCK_ANIMATION)
            {
                this.animateIdle();
                console.log(this.characterName + " idle enemy attack complete");
            }

            this.sendToServer();
        }

        createCharacter(characterName:string, x:number, y:number)
        {
            super.createCharacter(characterName, x, y);
            this.rotateLeft();
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

        addDamage(enemyAbility:string)
        {
            console.log(this.characterName + " enemy take damage");
            this.currentDamage = 0;
            this.damageAnimationComplete = false;
            this.moveHitIsComplete = false;

            this.startMovingWhenHit();
            if(this.currentAnimation != CharacterModule.CharacterAnimations.BLOCK_ANIMATION)
            {
                this.animateHit();

                if(enemyAbility == CharacterModule.CharacterActionType.MELEE)
                {
                    this.currentDamage = 10;
                }
                else if(enemyAbility == CharacterModule.CharacterActionType.RANGE)
                {
                    this.currentDamage = 5;
                }
            }
            if(this.currentDamage == 0)
            {
                this.damageAnimationComplete = true;
            }
        }

        moveHitIsComplete:boolean;

        moveHitComplete()
        {
            this.graphics.body.velocity.x = 0;
            this.graphics.body.velocity.y = 0;
            this.moveHitIsComplete = true;
            this.allDamageAnimationsComplete();
        }

        allDamageAnimationsComplete()
        {
            if(this.moveHitIsComplete && this.damageAnimationComplete)
            {
                this.dispatchSignal("CharacterDamage", this.currentDamage);
            }
        }

        damageAnimationComplete:boolean;

        onDamageComplete()
        {
            console.log(this.characterName + " damage complete");
            this.graphics.events.onAnimationComplete.removeAll();
            if(this.currentAnimation == CharacterModule.CharacterAnimations.DAMAGE_ANIMATION)
            {
                this.damageAnimationComplete = true;
                this.animateIdle();
                this.allDamageAnimationsComplete();
                console.log(this.characterName + " idle enemy damage complete");
            }
        }

    }
}