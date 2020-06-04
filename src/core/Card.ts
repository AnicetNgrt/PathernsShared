import Id from "./Id";

export default class Card {
    ownerId:Id | null;
    constructor(
        ownerId:Id | null,
        readonly id:Id
    ) {
        this.ownerId = ownerId;
    }

    copy(): Card {
        return new Card(
            this.ownerId,
            this.id
        )
    }
}