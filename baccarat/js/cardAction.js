export class CardAction {
    constructor(game, cardSlot) {
        this.game = game;
        this.cardSlot = cardSlot;
        this.playerScore = 0;
        this.bankerScore = 0;
        this.playerHit = false;
        this.bankerHit = false;
        this.results = [false, false, false, false, false, false, false, false];
        this.cardDrawDelay = 550;
        this.cardFlipDelay = 350;
        this.game.addEventListener(
            "stageChanged",
            this.stageManager.bind(this)
        );
        this.game.addEventListener(
            "cardAction",
            this.cardActionManager.bind(this)
        );
    }

    init() {
        this.playerScore = 0;
        this.bankerScore = 0;
        this.playerHit = false;
        this.bankerHit = false;
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    getScore() {
        this.playerScore = this.cardSlot.getPlayerScore();
        this.bankerScore = this.cardSlot.getBankerScore();
    }

    async drawCard(num) {
        this.cardSlot.setCard(num);
        await this.sleep(this.cardDrawDelay);
    }

    async flipCard(num) {
        this.cardSlot.flipCard(num);
        await this.sleep(this.cardFlipDelay);
    }

    async cardDistribute() {
        let cardOrder = [0, 3, 1, 4];

        for (const order of cardOrder) {
            await this.drawCard(order);
        }

        for (const num of cardOrder) {
            await this.flipCard(num);
        }

        this.getScore();
    }

    async hitCard() {
        if (this.playerScore < 8 && this.bankerScore < 8) {
            this.results[0] = false;
            if (this.playerScore < 6) this.playerHit = true;

            if (this.playerHit) {
                await this.drawCard(2);
                await this.flipCard(2);

                let player3rdCard = this.cardSlot.number[2];
                switch (this.bankerScore) {
                    case 0:
                    case 1:
                    case 2:
                        this.bankerHit = true;
                        break;
                    case 3:
                        this.bankerHit = player3rdCard != 8;
                        break;
                    case 4:
                        this.bankerHit =
                            player3rdCard >= 2 && player3rdCard <= 7;
                        break;
                    case 5:
                        this.bankerHit =
                            player3rdCard >= 4 && player3rdCard <= 7;
                        break;
                    case 6:
                        this.bankerHit =
                            player3rdCard == 6 || player3rdCard == 7;
                        break;
                    default:
                        this.bankerHit = false;
                }
            } else {
                if (this.bankerScore < 6) this.bankerHit = true;
            }

            if (this.bankerHit) {
                await this.drawCard(5);
                await this.flipCard(5);
            }
        } else {
            this.results[0] = true;
        }
        this.getScore();
    }

    async stageManager({ stage }) {
        if (stage == 0) {
            this.game.deck.cutCard();
            this.cardSlot.init();
            this.init();
        }
    }

    async cardActionManager({ status }) {
        if (status) {
            this.game.setNextButtonStatus(false);
            await this.cardDistribute();
            await this.hitCard();
            this.game.setCardAction(false);
        }
    }
}
