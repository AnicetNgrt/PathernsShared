import GameBranch from "../GameBranch";
import Id from "../Id";
import Vec2 from "../Vec2";
import { Ccl, ModifType, CclType, cclOK } from "../Modifiers";

export default function placePawn(gb:GameBranch, pawnId:Id, pos:Vec2): Ccl {
    const pawn = gb.editPawn(pawnId, [ModifType.SET_PAWN_PLACED]);
    if(!pawn) return new Ccl(CclType.UNKNOWN_PAWN, pawnId);

    if(pawn.placed) return new Ccl(CclType.PAWN_PLACED, pawn);
    if(!pawn.alive) return new Ccl(CclType.DEAD_PAWN, pawn);

    const tile = gb.editTile(pos, [ModifType.PLACE_PAWN_ON_TILE]);
    if(!tile) return new Ccl(CclType.UNKNOWN_TILE, pos);

    if(tile.occupiedBy !== null) return new Ccl(CclType.OCCUPIED_TILE, tile);
    if(tile.slippery) return new Ccl(CclType.SLIPPERY_TILE, tile);

    if(pawn.ownerId) {
        const owner = gb.cgs().players.get(pawn.ownerId);
        if(!owner) return new Ccl(CclType.UNKNOWN_PLAYER, pawn.ownerId);

        if(!owner.playing && !gb.rules.can_unplaying_player_place_pawn) return new Ccl(CclType.UNPLAYING_PLAYER, owner);

        if(tile.prohibitedFor.has(owner.id)) return new Ccl(CclType.RESTRICTED_TILE_FOR_PLAYER, tile);

    } else if (!gb.rules.can_unowned_pawn_be_placed) {
        return new Ccl(CclType.UNOWNED_PAWN, pawn);
    }

    tile.occupiedBy = pawnId;
    pawn.placed = true;
    return cclOK;
}