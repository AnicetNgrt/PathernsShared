export enum CclType {
    /*0*/OK,                                 
    /*1*/UNKNOWN_PAWN,
    /*2*/UNKNOWN_PLAYER,
    /*3*/UNKNOWN_TILE,
    /*4*/PAWN_PLACED,
    /*5*/TOO_MANY_PAWNS,
    /*6*/UNPLAYING_PLAYER,
    /*7*/UNOWNED_PAWN,
    /*8*/OCCUPIED_TILE,
    /*9*/RESTRICTED_TILE_FOR_PLAYER,
    /*10*/EMPTY_TILE,
    /*11*/SLIPPERY_TILE,
    /*12*/DEAD_PAWN,
    /*13*/PAWN_NOT_PLACED
}

export class Ccl {
    constructor(
        readonly type:CclType,
        readonly attached?:any
    ) {}
}

export const cclOK = new Ccl(CclType.OK);

export enum ModifType {
    ADD_PAWN,
    PLACE_PAWN_ON_TILE,
    SET_PAWN_PLACED,
    SET_PAWN_OWNER,
    SET_PAWN_ALIVE,
    GIVE_PAWN,
    TAKE_PAWN
}

export class Modif<T> {
    constructor(
        readonly old:T,
        readonly young:T,
        readonly type:ModifType
    ) {}
}

export function buildModifs<T>(old:T, young:T, modifTypes:ModifType[]): Modif<T>[] {
    var modifs:Modif<T>[] = [];
    for(var modifType of modifTypes) {
        modifs.push(new Modif<T>(old, young, modifType));
    }
    return modifs;
}