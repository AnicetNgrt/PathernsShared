import { Modif } from "./Modifiers";
import Id from "./Id";
import Player from "./Player";
import Card from "./Card";
import Pawn from "./Pawn";
import Vec2 from "./Vec2";
import { Tile } from "./Tile";

export function mapFromPlayers(players:Player[]) {
    var map = new Map<Id, Player>();
    for(var p of players) {
        map.set(p.id, p);
    }
    return map;
}

export function mapFromPawns(pawns:Pawn[]) {
    var map = new Map<Id, Pawn>();
    for(var pa of pawns) {
        map.set(pa.id, pa);
    }
    return map;
}

export function mapFromTiles(tiles:Tile[]) {
    var map = new Map<Vec2, Tile>();
    for(var t of tiles) {
        map.set(t.pos, t);
    }
    return map;
}

export default class GameState {
    constructor(
        readonly lastModifs:Modif<any>[],
        readonly iteration:number,
        readonly players:Map<Id, Player>,
        readonly cards:Map<Id, Card>,
        readonly pawns:Map<Id, Pawn>,
        readonly tiles:Map<Vec2, Tile>,
    ) {}

    copy(modifs:Modif<any>[]):GameState {
        return new GameState(
            modifs,
            this.iteration+1,
            new Map(this.players),
            new Map(this.cards),
            new Map(this.pawns),
            new Map(this.tiles)
        )
    }
}