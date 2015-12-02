/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterProxy extends MvcModule.Proxy{

        static NAME:string = "CharacterProxy";

        constructor(){
            super(CharacterProxy.NAME);

            this.VO = new CharacterVO();
        }

        setCharacterName(characterName:string)
        {
            this.VO.characterName = characterName;
        }

        getCharacterName():string
        {
            return this.VO.characterName;
        }

        setCharacter(character:Phaser.Sprite)
        {
            this.VO.character = character;
        }

        getCharacter():Phaser.Sprite
        {
            return this.VO.character;
        }

        setLife(value:number){
            this.VO.life = value;
        }

        setEnergy(value:number){
            this.VO.energy = value;
        }

        getLife():number{
            return this.VO.life;
        }

        getEnergy():number{
            return this.VO.energy;
        }

        setAbility(action:string)
        {
            this.VO.ability = action;
        }

        getAbility():string
        {
            return this.VO.ability;
        }
    }
}