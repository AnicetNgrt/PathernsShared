import GameBranch from "../GameBranch";
import Id from "../Id";
import { ModifType, Ccl, CclType, cclOK } from "../Modifiers";

export default function killPawn(gb:GameBranch, pawnId:Id) {
    const pawn = gb.editPawn(pawnId, [ModifType.SET_PAWN_PLACED]);
    if(!pawn) return new Ccl(CclType.UNKNOWN_PAWN, pawnId);

    if(!pawn.placed) return new Ccl(CclType.PAWN_NOT_PLACED, pawn);
    if(!pawn.alive) return new Ccl(CclType.DEAD_PAWN, pawn);

    if(pawn.ownerId) {
        const owner = gb.editPlayer(pawn.ownerId, [ModifType.TAKE_PAWN]);
        if(!owner) return new Ccl(CclType.UNKNOWN_PLAYER, pawn.ownerId);
        owner.pawnCount -= 1;
    }

    pawn.alive = false;
    return cclOK;
}