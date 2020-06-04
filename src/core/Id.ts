class Id {
    constructor(
        readonly tag:String,
        readonly type:GoT
    ) {}
}

export enum GoT {
    PLAYER,
    PAWN,
    TILE,
    CARD,
    NONE
}

export default Id;

