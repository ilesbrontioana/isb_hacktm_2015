/**
 * Created by ioanailes on 28/10/15.
 */
/// <reference path="../../../../assets/sounds/soundnames.ts" />
var SoundsModule;
(function (SoundsModule) {
    var SoundsManager = (function () {
        function SoundsManager(game, assetPath) {
            this.sounds = {};
            this.game = game;
            this.assetPath = assetPath;
        }
        SoundsManager.prototype.loadSounds = function () {
            var i;
            for (i = 0; i < SoundsModule.SoundNames.soundNames.length; i++) {
                var soundName = SoundsModule.SoundNames.soundNames[i];
                this.game.load.audio(soundName, this.assetPath + soundName + ".wav");
            }
        };
        SoundsManager.prototype.createSounds = function () {
            var i;
            for (i = 0; i < SoundsModule.SoundNames.soundNames.length; i++) {
                var soundName = SoundsModule.SoundNames.soundNames[i];
                var sound = this.game.add.audio(soundName);
                this.sounds[sound.name] = sound;
            }
        };
        SoundsManager.prototype.playSound = function (name, duration, loop, force) {
            if (this.sounds[name]) {
                if (!this.sounds[name].isPlaying && !this.sounds[name].paused) {
                    if (duration == 0) {
                        this.sounds[name].play();
                    }
                    else {
                        this.sounds[name].fadeIn(duration);
                    }
                    if (loop == true) {
                        this.sounds[name].loop = true;
                    }
                }
                else if (force == true) {
                    if (duration == 0) {
                        this.sounds[name].play();
                    }
                    else {
                        this.sounds[name].fadeIn(duration);
                    }
                    if (loop == true) {
                        this.sounds[name].loop = true;
                    }
                }
            }
        };
        SoundsManager.prototype.stopSound = function (name, duration) {
            if (this.sounds[name]) {
                if (this.sounds[name].isPlaying) {
                    if (duration == 0) {
                        this.sounds[name].stop();
                    }
                    else {
                        this.sounds[name].fadeOut(duration);
                    }
                    this.sounds[name].loop = false;
                }
            }
        };
        SoundsManager.prototype.pauseSound = function (name) {
            if (this.sounds[name]) {
                if (this.sounds[name].isPlaying) {
                    this.sounds[name].pause();
                }
            }
        };
        SoundsManager.prototype.resumeSound = function (name) {
            if (this.sounds[name]) {
                if (!this.sounds[name].isPlaying) {
                    this.sounds[name].resume();
                }
            }
        };
        SoundsManager.prototype.changeSoundVolume = function (name, volume, duration) {
            if (this.sounds[name]) {
                if (this.sounds[name].isPlaying) {
                    if (duration == 0) {
                        this.sounds[name].volume = volume;
                    }
                    else {
                        this.sounds[name].fadeTo(duration, volume);
                    }
                }
            }
        };
        return SoundsManager;
    })();
    SoundsModule.SoundsManager = SoundsManager;
})(SoundsModule || (SoundsModule = {}));
//# sourceMappingURL=soundsmanager.js.map