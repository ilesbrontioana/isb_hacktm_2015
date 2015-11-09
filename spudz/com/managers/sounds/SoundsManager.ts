/**
 * Created by ioanailes on 28/10/15.
 */
/// <reference path="soundnames.ts" />
module SoundsModule
{
    import P2 = Phaser.Physics.P2;
    export class SoundsManager{

        private static _instance:SoundsManager = new SoundsManager();

        assetPath = '../../spudz/bin/assets/sounds/';
        sounds: {[name:string]:Phaser.Sound; } = {};

        constructor(){
            if(SoundsManager._instance){
                throw new Error("Te Dreq: Instantiation failed: Use SoundsManager.getInstance()");
            }
            SoundsManager._instance = this;
        }

        public static getInstance():SoundsManager {
            return SoundsManager._instance;
        }

        loadSounds(){
            for(var i = 0; i < SoundsModule.SoundNames.soundNames.length; i++)
            {
                var soundName = SoundsModule.SoundNames.soundNames[i];
                GameControllerModule.GameController.getInstance().game.load.audio(soundName, this.assetPath + soundName + ".wav");
            }
        }

        createSounds() {
            for(var i = 0; i < SoundsModule.SoundNames.soundNames.length; i++)
            {
                var soundName = SoundsModule.SoundNames.soundNames[i];
                var sound = GameControllerModule.GameController.getInstance().game.add.audio(soundName);
                this.sounds[sound.name] = sound;
            }
        }

        playSound(name:string, duration:number = 0, loop:Boolean = false, force:Boolean = false) {
            if(this.sounds[name])
            {
                if(!this.sounds[name].isPlaying && !this.sounds[name].paused)
                {
                    if(duration == 0)
                    {
                        this.sounds[name].play();
                    }
                    else
                    {
                        this.sounds[name].fadeIn(duration);
                    }
                    if(loop == true)
                    {
                        this.sounds[name].loop = true;
                    }
                    else
                    {
                        this.sounds[name].loop = false;
                    }
                }
                else if(force == true)
                {
                    if(duration == 0)
                    {
                        this.sounds[name].play();
                    }
                    else
                    {
                        this.sounds[name].fadeIn(duration);
                    }
                    if(loop == true)
                    {
                        this.sounds[name].loop = true;
                    }
                    else
                    {
                        this.sounds[name].loop = false;
                    }
                }
            }
        }

        stopSound(name:string, duration:number = 0)
        {
            if(this.sounds[name])
            {
                if(this.sounds[name].isPlaying)
                {
                    if(duration == 0)
                    {
                        this.sounds[name].stop();
                    }
                    else
                    {
                        this.sounds[name].fadeOut(duration);
                    }
                    this.sounds[name].loop = false;
                }
            }
        }

        pauseSound(name:string)
        {
            if(this.sounds[name])
            {
                if(this.sounds[name].isPlaying)
                {
                    this.sounds[name].pause();
                }
            }
        }

        resumeSound(name:string)
        {
            if(this.sounds[name])
            {
                if(!this.sounds[name].isPlaying)
                {
                    this.sounds[name].resume();
                }
            }
        }

        changeSoundVolume(name:string, volume:number, duration:number = 0)
        {
            if(this.sounds[name])
            {
                if(this.sounds[name].isPlaying)
                {
                    if(duration == 0)
                    {
                        this.sounds[name].volume = volume;
                    }
                    else
                    {
                        this.sounds[name].fadeTo(duration, volume);
                    }
                }
            }
        }
    }
}
