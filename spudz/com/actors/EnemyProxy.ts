/**
 * Created by Ioana on 11/16/2015.
 */
module CharacterModule
{
    export class EnemyProxy extends MvcModule.Proxy
    {
        static NAME:string = "EnemyProxy";

        constructor(){

            super(EnemyProxy.NAME);

            this.VO = new CharacterModule.EnemyVO();
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
    }
}