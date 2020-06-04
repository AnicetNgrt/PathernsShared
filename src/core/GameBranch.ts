import GameState from "./GameState";
import { Modif, ModifType, buildModifs, Ccl } from "./Modifiers";
import Id from "./Id";
import Pawn from "./Pawn";
import Player from "./Player";
import Vec2 from "./Vec2";
import { Tile } from "./Tile";
import Rules from "./Rules";

export default class GameBranch {
    constructor(
        readonly rules:Rules,
        readonly history: Array<GameState>
    ) {}

    cgs():GameState {
        return this.history[this.history.length-1];
    }

    copy(): GameBranch {
        return new GameBranch(
            this.rules,
            [...this.history]
        )
    }

    nextState(modifs:Modif<any>[]):GameState {
        return this.cgs().copy(modifs);
    }

    commit(gs:GameState) {
        this.history.push(gs);
    }

    editGameState(modifs:Modif<any>[]): GameState {
        let ns = this.nextState(modifs);
        this.commit(ns);
        return ns;
    }

    editPawn(pawnId:Id, modifTypes:ModifType[]): Pawn | undefined {
        let pawn = this.cgs().pawns.get(pawnId);
        if(!pawn) return;
        let newPawn = pawn.copy();
        let modifs = buildModifs<Pawn>(pawn, newPawn, modifTypes);
        let ns = this.editGameState(modifs);
        ns.pawns.set(pawnId, newPawn);
        return newPawn;
    }

    editPlayer(playerId:Id, modifTypes:ModifType[]): Player | undefined {
        let player = this.cgs().players.get(playerId);
        if(!player) return;
        let newPlayer = player.copy();
        let modifs = buildModifs<Player>(player, newPlayer, modifTypes);
        let ns = this.editGameState(modifs);
        ns.players.set(playerId, newPlayer);
        return newPlayer;
    }

    editTile(pos:Vec2, modifTypes:ModifType[]): Tile | undefined {
        let tile = this.cgs().tiles.get(pos);
        if(!tile) return;
        let newTile = tile.copy();
        let modifs = buildModifs<Tile>(tile, newTile, modifTypes);
        let ns = this.editGameState(modifs);
        ns.tiles.set(pos, newTile);
        return newTile;
    }
}