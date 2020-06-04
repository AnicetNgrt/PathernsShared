import Id from "./Id";

export default class Pawn {
    ownerId:Id | null;
    placed:boolean;
    alive:boolean;
    constructor(
        ownerId:Id | null,
        placed:boolean,
        alive:boolean,
        readonly id:Id
    ) {
        this.ownerId = ownerId;
        this.placed = placed;
        this.alive = alive;
    }

    copy(): Pawn {
        return new Pawn(
            this.ownerId,
            this.placed,
            this.alive,
            this.id
        )
    }
}