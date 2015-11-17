/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterAnimations {
        static IDLE_ANIMATION:string = "idle";
        static JUMP_ANIMATION:string = "jump";
        static RUN_ANIMATION:string = "run";
        static MELEE_ANIMATION:string = "melee";
        static RANGE_ANIMATION:string = "range";
        static DAMAGE_ANIMATION:string = "damage";
        static BLOCK_ANIMATION:string = "block";
        static ULTIMATE_ANIMATION:string = "ultimate";
    }

    export class CharacterAnimationsAssets
    {
        static assets: {[name:string]:{[name:string]: string}; } = {
            "pirate" : {
                "idle" : 'idle_pirate',
                "jump" : 'jump_pirate',
                "run" : 'pirate_run',
                "melee" : 'melee_pirate 2_frame_',
                "range" : 'range_pirate',
                "damage" : 'Layer ',
                "block" : 'block_pirate'

            },
            "marine" : {
                "idle" : 'idle_space',
                "jump" : 'jump_space',
                "run" : 'space_run',
                "melee" : 'melee_space',
                "range" : 'range_space',
                "damage" : 'Hit_space',
                "block" : 'block '
            },
            "bacon" : {
                "idle" : 'idle_bacon',
                "jump" : 'bacon jumping',
                "run" : 'bacon flash running 2',
                "melee" : 'melee_bacon',
                "range" : 'bacon gunslinger',
                "damage" : 'Hit_bacon',
                "block" : 'block_bacon'
            }
        };
    }

    export class CharacterAnimationsSounds
    {
        static sounds: {[name:string]:{[name:string]: string}; } = {
            "pirate" : {
                "jump" : 'pirate_jump',
                "land" : 'pirate_land',
                "run" : 'pirate_run',
                "melee" : 'pirate_sword',
                "range" : 'pirate_bomb',
                "damage" : 'Layer ',
                "damageVoice" : 'Hit_space',
                "block" : 'block_pirate'

            },
            "marine" : {
                "jump" : 'marine_jump',
                "land" : 'marine_land',
                "run" : 'pirate_run',
                "melee" : 'marine_pumn',
                "range" : 'marine_shotgun',
                "damage" : 'Hit_space',
                "damageVoice" : 'Hit_space',
                "block" : 'block '
            },
            "bacon" : {
                "jump" : 'bacon jump',
                "land" : 'bacon_land',
                "run" : 'pirate_run',
                "range" : 'bacon_pistol',
                "melee" : 'bacon maraca_cha_cha',
                "damage" : 'Hit_bacon',
                "damageVoice" : 'Hit_space',
                "block" : 'block_bacon'
            }
        };
    }
}