import GameState from "../core/GameState";
import { ModifType, Modif } from "../core/Modifiers";
import Pawn from "../core/Pawn";
import Id, { GoT } from "../core/Id";
import { blankGs } from "./assets/gameStates";
import { pawnIds } from "./assets/ids";

describe('Test GameState.ts copy()', ()=>{
    let gs = blankGs();
    let pawnId = pawnIds[0];
    let pawn = new Pawn(null, true, true, pawnId);
    let modif = new Modif<Pawn|null>(null, pawn, ModifType.ADD_PAWN);
    let gsCopy = gs.copy([modif]);
    gsCopy.pawns.set(pawn.id, pawn);
    
    test('should give a copy',()=>{
        expect(gsCopy).not.toBe(gs);
    });

    test('should copy fields',()=>{
        expect(gsCopy.cards).not.toBe(gs.cards);
    });

    test('should copy pawn map',()=>{
        expect(gs.pawns.get(pawnId)).toBe(undefined);
    });

    test('should have 1 more iteration',()=>{
        expect(gsCopy.iteration).toBe(gs.iteration+1);
    });

    test('should have correct modifs',()=>{
        expect(gsCopy.lastModifs).toContain(modif);
    });
});