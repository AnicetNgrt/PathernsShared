import Player from "../../core/Player";
import { playerIds, pawnIds } from "../assets/ids";
import GameState, { mapFromPlayers, mapFromPawns } from "../../core/GameState";
import GameBranch from "../../core/GameBranch";
import Pawn from "../../core/Pawn";
import rules from "../json/rules/restrictive.json";
import setPawnOwner from "../../core/modifiers/setPawnOwner";
import { CclType } from "../../core/Modifiers";

describe('test setPawnOwner()',()=>{
    let pawnA = new Pawn(null, false, true, pawnIds[0]);
    let pawnB = new Pawn(playerIds[0], false, true, pawnIds[1]);
    let pawnC = new Pawn(playerIds[0], true, true, pawnIds[2]);
    let pawnD = new Pawn(playerIds[0], false, true, pawnIds[3]);
    let pawnE = new Pawn(playerIds[0], false, true, pawnIds[4]);
    let pawnF = new Pawn(playerIds[1], false, true, pawnIds[5]);
    let pawns = mapFromPawns([pawnA, pawnB, pawnC, pawnD, pawnE, pawnF]);

    let playerA = new Player("A", "", 4, true, playerIds[0]);
    let playerB = new Player("B", "", 1, false, playerIds[1]);
    let players = mapFromPlayers([playerA, playerB]);

    let gs = new GameState([], 0, players, new Map(), pawns, new Map());
    let gb = new GameBranch(rules, [gs]);

    test('should check if not too many pawns owned by player',()=>{
        let ccl = setPawnOwner(gb, pawnA.id, playerA.id);
        expect(ccl.type).toBe(CclType.TOO_MANY_PAWNS);
    });

    test('should be ok when its ok and pawn is not owned',()=>{
        let ccl = setPawnOwner(gb, pawnA.id, playerB.id);
        expect(ccl.type).toBe(CclType.OK);
        expect(gb.cgs().players.get(playerB.id)?.pawnCount).toBe(playerB.pawnCount+1);
        ccl = setPawnOwner(gb, pawnA.id, null);
        expect(ccl.type).toBe(CclType.OK);
        expect(gb.cgs().players.get(playerB.id)?.pawnCount).toBe(playerB.pawnCount);
    });

    test('should be ok when its ok and pawn is owned',()=>{
        let ccl = setPawnOwner(gb, pawnB.id, playerB.id);
        expect(ccl.type).toBe(CclType.OK);
        expect(gb.cgs().players.get(playerB.id)?.pawnCount).toBe(playerB.pawnCount+1);
        expect(gb.cgs().players.get(playerA.id)?.pawnCount).toBe(playerA.pawnCount-1);
        ccl = setPawnOwner(gb, pawnB.id, null);
        expect(ccl.type).toBe(CclType.OK);
        expect(gb.cgs().players.get(playerB.id)?.pawnCount).toBe(playerB.pawnCount);
    });
});