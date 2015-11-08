/**
 * Created by Iovan on 07.11.2015.
 */
module ConnectionModule
{
    export class MoveVO
    {
        public destination: Phaser.Point;
        public ability: string;
        public player_pos: Phaser.Point;
        public opponent_pos: Phaser.Point;
        public player_health: number;
        public opponent_health: number;
        public player_energy: number;
        public opponent_energy: number;
    }
}