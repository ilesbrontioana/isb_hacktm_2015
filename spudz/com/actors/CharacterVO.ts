/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterVO{

        public life:number = 100;
        public energy:number = 100;
        public character:Phaser.Sprite;
        public nickname:string;
        public characterName:string;
        public ability:string;
        public actionRay:Phaser.Sprite;

        constructor(){

        }
    }
}