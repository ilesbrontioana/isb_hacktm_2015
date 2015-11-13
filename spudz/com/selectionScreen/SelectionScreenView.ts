/**
 * Created by adm on 07.11.15.
 */
module SelectionScreenModule{
    export class SelectionScreenView extends MvcModule.View{

        static NAME:string = "SelectionScreenView";
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

        opponentSelection:string = "";
        canAddOpponent:boolean = false;

        constructor(){
            super(SelectionScreenView.NAME);

            SoundsModule.SoundsManager.getInstance().playSound('ambiance', 0, true);

            this.bmd = this.game.add.sprite(50,50,"ui", "button.png");

            this.background = this.game.add.sprite(0,0,'background_welcome_screen');

            this.active_bacon = this.game.add.sprite(0,0,'active_bacon');
            this.active_bacon.visible = false;

            this.active_pirate = this.game.add.sprite(0,0,'active_pirate');
            this.active_pirate.visible = false;

            this.active_space = this.game.add.sprite(0,0,'active_space');
            this.active_space.visible = false;

            this.back_button = this.game.add.sprite(0,0,'back_button');
            this.menu_bar = this.game.add.sprite(0,0,'menu_bar');
            this.menu_button = this.game.add.sprite(0,0,'menu_button');
            this.next_button = this.game.add.sprite(0,0,'next_button');

            this.non_active_bacon = this.game.add.sprite(0,0,'non-active_bacon');
            this.non_active_pirate = this.game.add.sprite(0,0,'non-active_pirate');
            this.non_active_space = this.game.add.sprite(0,0,'non-active_space');

            //this.background.inputEnabled = true;
            //this.background.events.onInputDown.add(this.onStartGamePressed, this);

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
            this.non_active_bacon.x = 100;
            this.non_active_pirate.visible = false;
            this.non_active_space.visible = false;
            SoundsModule.SoundsManager.getInstance().playSound("bacon_select");
            this.addTimerToAddOpponent();
            this.signalsManager.dispatch("characterSelected", "bacon");
        }

        onPirateSelected(){
            this.non_active_bacon.visible = false;
            this.non_active_space.visible = false;
            this.non_active_pirate.x = 100;
            SoundsModule.SoundsManager.getInstance().playSound("pirate_select");
            this.addTimerToAddOpponent();
            this.signalsManager.dispatch("characterSelected", "pirate");
        }

        onSpaceSelected(){
            this.non_active_bacon.visible = false;
            this.non_active_pirate.visible = false;
            this.non_active_space.x = 100;
            SoundsModule.SoundsManager.getInstance().playSound("marine_select");
            this.addTimerToAddOpponent();
            this.signalsManager.dispatch("characterSelected", "marine");
        }

        addOpponent(selection:string)
        {
            this.opponentSelection = selection;

            if(this.canAddOpponent)
            {
                this.addOpponentGraphics();
            }
        }

        addOpponentGraphics()
        {
            if(this.opponentSelection == "pirate")
            {
                this.active_pirate.x = 1200;
                this.active_pirate.y = 90;
                this.active_pirate.scale.x = -1;
                this.active_pirate.visible = true;
                SoundsModule.SoundsManager.getInstance().playSound("pirate_select");
            }
            else if(this.opponentSelection == "bacon")
            {
                this.active_bacon.x = 1200;
                this.active_bacon.y = 90;
                this.active_bacon.scale.x = -1;
                this.active_bacon.visible = true;
                SoundsModule.SoundsManager.getInstance().playSound("bacon_select");
            }
            else
            {
                this.active_space.x = 1200;
                this.active_space.y = 90;
                this.active_space.scale.x = -1;
                this.active_space.visible = true;
                SoundsModule.SoundsManager.getInstance().playSound("marine_select");
            }

            GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * 2, function()
            {
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


            }.bind(this), this);
        }

        addTimerToAddOpponent()
        {

            this.non_active_bacon.inputEnabled = false;
            this.non_active_pirate.inputEnabled = false;
            this.non_active_space.inputEnabled = false;

            this.non_active_bacon.events.onInputDown.removeAll();
            this.non_active_pirate.events.onInputDown.removeAll();
            this.non_active_space.events.onInputDown.removeAll();

            GraphicsModule.GraphicsManager.getInstance().game.time.events.add(Phaser.Timer.SECOND * 2, function()
            {
                if(this.opponentSelection != "")
                {
                    this.addOpponentGraphics();
                }
                else
                {
                    this.canAddOpponent = true;
                }
            }.bind(this), this);
        }
    }
}