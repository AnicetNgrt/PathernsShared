import GameBranch from "../GameBranch";
import Id from "../Id";
import { Ccl, ModifType, CclType, cclOK } from "../Modifiers";

export default function setPawnOwner(gb:GameBranch, pawnId:Id, playerId:Id|null): Ccl {
    const pawn = gb.editPawn(pawnId, [ModifType.SET_PAWN_OWNER]);
    if(!pawn) return new Ccl(CclType.UNKNOWN_PAWN, pawnId);
    
    if(playerId === null) {
        if(pawn.ownerId) {
            const oldOwner = gb.editPlayer(pawn.ownerId, []);
            if(!oldOwner) return new Ccl(CclType.UNKNOWN_PLAYER, pawn.ownerId);
            oldOwner.pawnCount -= 1;
        }
        pawn.ownerId = null;
        return cclOK;
        
    } else {
        const newOwner = gb.editPlayer(playerId, []);
        if(!newOwner) return new Ccl(CclType.UNKNOWN_PLAYER, playerId);

        if(newOwner.pawnCount === gb.rules.max_pawn) return new Ccl(CclType.TOO_MANY_PAWNS, pawn.ownerId);;

        if(pawn.ownerId) {
            const oldOwner = gb.editPlayer(pawn.ownerId, []);
            if(!oldOwner) return new Ccl(CclType.UNKNOWN_PLAYER, pawn.ownerId);
            oldOwner.pawnCount -= 1;
        }

        pawn.ownerId = newOwner.id;
        newOwner.pawnCount += 1;

        return cclOK;
    }
}