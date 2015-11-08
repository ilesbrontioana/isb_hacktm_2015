/**
 * Created by adm on 07.11.15.
 */
module SelectionScreenModule{
    export class SelectionScreenView extends MvcModule.View{

        bmd:Phaser.Sprite;

        background:Phaser.Sprite;
        active_bacon:Phaser.Sprite;
        active_pirate:Phaser.Sprite;
        active_space:Phaser.Sprite;
        back_button:Phaser.Sprite;
        menu_bar:Phaser.Sprite;
        menu_button:Phaser.Sprite;
        next_button:Phaser.Sprite;
        non_active_bacon:Phaser.Sprite;
        non_active_pirate:Phaser.Sprite;
        non_active_space:Phaser.Sprite;

        constructor(){
            super();
            this.bmd = this.game.add.image(50,50,"ui", "button.png");

            this.background = this.game.add.image(0,0,'background_welcome_screen');

            this.active_bacon = this.game.add.image(0,0,'active_bacon');
            this.active_bacon.visible = false;

            this.active_pirate = this.game.add.image(0,0,'active_pirate');
            this.active_pirate.visible = false;

            this.active_space = this.game.add.image(0,0,'active_space');
            this.active_space.visible = false;

            this.back_button = this.game.add.image(0,0,'back_button');
            this.menu_bar = this.game.add.image(0,0,'menu_bar');
            this.menu_button = this.game.add.image(0,0,'menu_button');
            this.next_button = this.game.add.image(0,0,'next_button');

            this.non_active_bacon = this.game.add.image(0,0,'non-active_bacon');
            this.non_active_pirate = this.game.add.image(0,0,'non-active_pirate');
            this.non_active_space = this.game.add.image(0,0,'non-active_space');

            this.background.inputEnabled = true;
            this.background.events.onInputDown.add(this.onStartGamePressed, this);

            this.non_active_bacon.x = 100;
            this.non_active_bacon.y = 100;

            this.non_active_pirate.x = 450;
            this.non_active_pirate.y = 100;

            this.non_active_space.x = 800;
            this.non_active_space.y = 100;

            this.non_active_bacon.inputEnabled = true;
            this.non_active_pirate.inputEnabled = true;
            this.non_active_space.inputEnabled = true;

            this.non_active_bacon.events.onInputDown.add(this.onBaconSelected, this);
            this.non_active_pirate.events.onInputDown.add(this.onPirateSelected, this);
            this.non_active_space.events.onInputDown.add(this.onSpaceSelected, this);
        }

        onBaconSelected(){
            this.signalsManager.dispatch("characterSelected", "bacon");
            this.non_active_bacon.x = 100;
            this.non_active_pirate.visible = false;
            this.non_active_space.visible = false;
        }

        onPirateSelected(){
            this.signalsManager.dispatch("characterSelected", "pirate");
            this.non_active_bacon.visible = false;
            this.non_active_space.visible = false;
            this.non_active_pirate.x = 100;
        }

        onSpaceSelected(){
            this.signalsManager.dispatch("characterSelected", "space");
            this.non_active_bacon.visible = false;
            this.non_active_pirate.visible = false;
            this.non_active_space.x = 100;
        }

        onStartGamePressed(){
            this.dispatchSignal("StartGame");
            this.bmd.visible = false;

            this.background.visible = false;
            this.active_bacon.visible = false;
            this.active_pirate.visible = false;
            this.active_space.visible = false;
            this.back_button.visible = false;
            this.menu_bar.visible = false;
            this.menu_button.visible = false;
            this.next_button.visible = false;
            this.non_active_bacon.visible = false;
            this.non_active_pirate.visible = false;
            this.non_active_space.visible = false;
        }
    }
}

//this.game.load.image('active_bacon', '../../spudz/bin/assets/selectionScreen/active_bacon.png');
//this.game.load.image('active_pirate', '../../spudz/bin/assets/selectionScreen/active_pirate.png');
//this.game.load.image('active_space', '../../spudz/bin/assets/selectionScreen/active_space.png');
//this.game.load.image('back_button', '../../spudz/bin/assets/selectionScreen/back_button.png');
//this.game.load.image('background_welcome_screen', '../../spudz/bin/assets/selectionScreen/Background.png');
//this.game.load.image('menu_bar', '../../spudz/bin/assets/selectionScreen/menu_bar.png');
//this.game.load.image('menu_button', '../../spudz/bin/assets/selectionScreen/menu_button.png');
//this.game.load.image('next_button', '../../spudz/bin/assets/selectionScreen/next_button.png');
//this.game.load.image('non-active_bacon', '../../spudz/bin/assets/selectionScreen/active_bacon.png');
//this.game.load.image('non-active_pirate', '../../spudz/bin/assets/selectionScreen/non-active_pirate.png');
//this.game.load.image('non-active_space', '../../spudz/bin/assets/selectionScreen/non-active_space.png');