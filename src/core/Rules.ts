import Vec2 from "./Vec2";

interface Rules {
    board_size:Vec2;
    can_unowned_pawn_be_placed:boolean;
    can_unplaying_player_place_pawn:boolean;
    max_pawn:number;
}

export default Rules;