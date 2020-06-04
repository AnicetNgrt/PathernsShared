import Vec2 from "./Vec2";
import Id from "./Id";

export class Tile {

    occupiedBy:Id|null;
    prohibitedFor:Set<Id>;
    slippery:boolean;

    constructor(
        readonly pos:Vec2,
        occupiedBy:Id|null,
        prohibitedFor:Set<Id>,
        slippery:boolean,
        readonly empty:boolean
    ) {
        this.occupiedBy = occupiedBy;
        this.prohibitedFor = prohibitedFor;
        this.slippery = slippery;
    }

    copy():Tile {
        return new Tile(
            this.pos,
            this.occupiedBy,
            new Set(this.prohibitedFor),
            this.slippery,
            this.empty
        );
    }
}