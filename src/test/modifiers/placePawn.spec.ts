import Pawn from "../../core/Pawn"
import rules from "../json/rules/restrictive.json";
import { pawnIds, playerIds } from "../assets/ids"
import GameState, { mapFromPawns, mapFromTiles, mapFromPlayers } from "../../core/GameState";
import { Tile } from "../../core/Tile";
import Vec2 from "../../core/Vec2";
import Player from "../../core/Player";
import GameBranch from "../../core/GameBranch";
import placePawn from "../../core/modifiers/placePawn";
import { CclType } from "../../core/Modifiers";

describe("test placePawn()",()=>{
    let pawnA = new Pawn(null, false, true, pawnIds[0]); // no owner
    let pawnB = new Pawn(playerIds[0], false, true, pawnIds[1]); // placable
    let pawnC = new Pawn(playerIds[0], true, true, pawnIds[2]); // owner + placed
    let pawnD = new Pawn(playerIds[2], false, true, pawnIds[3]); // unknown owner
    let pawnE = new Pawn(playerIds[1], false, true, pawnIds[4]); // not playing owner
    let pawnF = new Pawn(playerIds[0], false, false, pawnIds[5]); // dead pawn
    let pawns = mapFromPawns([pawnA, pawnB, pawnC, pawnD, pawnE, pawnF]);

    let tileA = new Tile(new Vec2(0, 1), null, new Set(), false, false); // placable
    let tileB = new Tile(new Vec2(1, 1), pawnC.id, new Set(), false, false); // occupied
    let tileC = new Tile(new Vec2(2, 1), null, new Set(), true, false); // slippery
    let tileD = new Tile(new Vec2(2, 1), null, new Set(), false, true); // empty
    let tileE = new Tile(new Vec2(3, 1), null, new Set([playerIds[0], playerIds[1]]), false, true); // restricted
    let tiles = mapFromTiles([tileA, tileB, tileC, tileD, tileE]);

    let playerA = new Player("A", "", 3, true, playerIds[0]); // placable
    let playerB = new Player("B", "", 3, false, playerIds[1]); // not playing
    let players = mapFromPlayers([playerA, playerB]);

    let gs = new GameState([], 0, players, new Map(), pawns, tiles);
    let gb = new GameBranch(rules, [gs]);

    test('should check pawn is not unknown',()=>{
        let ccl = placePawn(gb, pawnD.id, tileA.pos);
        expect(ccl.type).toBe(CclType.UNKNOWN_PLAYER);
        expect(ccl.attached).toStrictEqual(pawnD.ownerId);
    });

    test('should check pawn is not dead',()=>{
        let ccl = placePawn(gb, pawnF.id, tileA.pos);
        expect(ccl.type).toBe(CclType.DEAD_PAWN);
        expect(ccl.attached).toStrictEqual(pawnF);
    });

    test('should check pawn is not already placed',()=>{
        let ccl = placePawn(gb, pawnC.id, tileA.pos);
        expect(ccl.type).toBe(CclType.PAWN_PLACED);
        expect(ccl.attached).toStrictEqual(pawnC);
    });

    test('should check tile is not unknown',()=>{
        let ccl = placePawn(gb, pawnB.id, {x:10,y:100});
        expect(ccl.type).toBe(CclType.UNKNOWN_TILE);
        expect(ccl.attached).toStrictEqual({x:10,y:100});
    });

    test('Should check tile is not occupied',()=>{
        let ccl = placePawn(gb, pawnB.id, tileB.pos);
        expect(ccl.type).toBe(CclType.OCCUPIED_TILE);
        expect(ccl.attached).toStrictEqual(tileB);
    });

    test('should check tile is not slippery',()=>{
        let ccl = placePawn(gb, pawnB.id, tileC.pos);
        expect(ccl.type).toBe(CclType.SLIPPERY_TILE);
        expect(ccl.attached).toStrictEqual(tileC);
    });

    test('should check owner is not null',()=>{
        let ccl = placePawn(gb, pawnA.id, tileA.pos);
        expect(ccl.type).toBe(CclType.UNOWNED_PAWN);
        expect(ccl.attached).toStrictEqual(pawnA);
    });

    test('should check owner is not unknown',()=>{
        let ccl = placePawn(gb, pawnD.id, tileA.pos);
        expect(ccl.type).toBe(CclType.UNKNOWN_PLAYER);
        expect(ccl.attached).toStrictEqual(pawnD.ownerId);
    });

    test('should check owner is playing',()=>{
        let ccl = placePawn(gb, pawnE.id, tileA.pos);
        expect(ccl.type).toBe(CclType.UNPLAYING_PLAYER);
        expect(ccl.attached).toStrictEqual(playerB);
    });

    test('should check tile is not restricted for player',()=>{
        let ccl = placePawn(gb, pawnB.id, tileE.pos);
        expect(ccl.type).toBe(CclType.RESTRICTED_TILE_FOR_PLAYER);
        expect(ccl.attached).toStrictEqual(tileE);
    });

    test('should be ok when its ok',()=>{
        let ccl = placePawn(gb, pawnB.id, tileA.pos);
        expect(ccl.type).toBe(CclType.OK);
    });

    test('should place pawn when its ok',()=>{
        placePawn(gb, pawnB.id, tileA.pos);
        expect(gb.cgs().pawns.get(pawnB.id)?.placed).toBe(true);
        expect(gb.cgs().tiles.get(tileA.pos)?.occupiedBy).toBe(pawnB.id);
    });
})