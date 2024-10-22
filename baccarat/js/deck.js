class Deck {
    constructor() {
        this.deck = [];
        this.init();
    }

    init() {
        this.deck = [];
        let deckCount = Math.floor(Math.random() * 4) + 4;
        for (
            let suits = 0, number = 1;
            suits < 4;
            suits += Math.floor(number / 13), number = (number % 13) + 1
        ) {
            this.deck.push(
                ...Array(deckCount)
                    .fill()
                    .map(() => [suits, number])
            );
        }
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    cutCard() {
        if (this.deck.length <= 4 * 13) this.init();
    }

    drawCard() {
        var cardIdx = Math.floor(Math.random() * this.deck.length);
        return [this.deck[cardIdx][0], this.deck[cardIdx][1]];
    }
}

export default Deck;
