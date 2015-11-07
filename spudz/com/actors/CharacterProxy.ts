/**
 * Created by adm on 07.11.15.
 */
module CharacterModule
{
    export class CharacterProxy extends MvcModule.Proxy{

        static NAME:string = this + "CharacterProxy";

        constructor(){
           this.VO = new CharacterVO();
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