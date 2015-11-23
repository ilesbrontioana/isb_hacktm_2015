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


        currentDamage:number;


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

        sendPosition()
        {
            //nothing to do
        }

        sendToServer()
        {
            this.dispatchSignal("OpponentInfoToServer");
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
            this.animateHit();
            this.currentDamage = 10;
        }

        onAttackComplete()
        {
            if(this.currentAnimation == CharacterModule.CharacterAnimations.DAMAGE_ANIMATION)
            {
                this.dispatchSignal("CharacterDamage", this.currentDamage);
            }
            super.onAttackComplete();

        }


    }
}