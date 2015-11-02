/**
 * Created by ioanailes on 28/10/15.
 */
/// <reference path="../../../../assets/sounds/soundnames.ts" />
module SoundsModule
{
    export class SoundsManager{

        game;
        assetPath;
        sounds: {[name:string]:Phaser.Sound; } = {};

        constructor(game, assetPath)
        {
            this.game = game;
            this.assetPath = assetPath;
        }

        loadSounds()
        {
            var i;
            for(i = 0; i < SoundsModule.SoundNames.soundNames.length; i++)
            {
                var soundName = SoundsModule.SoundNames.soundNames[i];
                this.game.load.audio(soundName, this.assetPath + soundName + ".wav");
            }
        }

        createSounds()
        {
            var i;
            for(i = 0; i < SoundsModule.SoundNames.soundNames.length; i++)
            {
                var soundName = SoundsModule.SoundNames.soundNames[i];
                var sound = this.game.add.audio(soundName);
                this.sounds[sound.name] = sound;
            }
        }

        playSound(name, duration, loop, force)
        {
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
                }
            }
        }

        stopSound(name, duration)
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

        pauseSound(name)
        {
            if(this.sounds[name])
            {
                if(this.sounds[name].isPlaying)
                {
                    this.sounds[name].pause();
                }
            }
        }

        resumeSound(name)
        {
            if(this.sounds[name])
            {
                if(!this.sounds[name].isPlaying)
                {
                    this.sounds[name].resume();
                }
            }
        }

        changeSoundVolume(name, volume, duration)
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
