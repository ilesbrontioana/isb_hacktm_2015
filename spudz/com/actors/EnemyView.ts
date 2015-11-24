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

            //TODO - send after player takes damage
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
            this.startMovingWhehHit();
            if(this.currentAction != CharacterModule.CharacterActionType.DEFENCE)
            {
                this.animateHit();
                this.currentAction = CharacterModule.CharacterActionType.DAMAGE;
                this.currentDamage = 10;
            }

        }

        startMovingWhehHit()
        {

        }

    }
}