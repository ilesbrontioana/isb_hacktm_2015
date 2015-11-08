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

        createCharacter(characterName)
        {
            var x = 1160;
            var y = 1240;

            this.graphics = GameControllerModule.GameController.getInstance().game.add.sprite(x, y, characterName);
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

            GameControllerModule.GameController.getInstance().game.physics.enable(this.graphics, Phaser.Physics.ARCADE);

            this.graphics.body.collideWorldBounds = true;
            this.graphics.body.gravity.y = 400;

            this.graphics.body.speed = this.speed;

            this.graphics.body.setSize(50, this.graphics.height, this.graphics.width/2 - 30, 0);
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
                actionType: this.currentAction,
                addActionRay:false});
        }
    }
}