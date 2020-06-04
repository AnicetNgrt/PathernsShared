import Id from "./Id";

export default class Player {
    pawnCount:number;
    playing:boolean;
    constructor(
        readonly name:String,
        readonly color:String,
        pawnCount:number,
        playing:boolean,
        readonly id:Id
    ) {
        this.pawnCount = pawnCount;
        this.playing = playing;
    }

    copy(): Player {
        return new Player(
            this.name,
            this.color,
            this.pawnCount,
            this.playing,
            this.id
        )
    }
}