export class BettingManager {
    constructor(game, cardSlot) {
        this.game = game;
        this.cardSlot = cardSlot;
        this.beforeChange = 0;
        this.record = [0, 0, 0, 0, 0, 0, 0];
        this.winningRatio = [2.0, 1.95, 8.0, 2.5, 1.5, 15.0, 40.0];
        this.results = [false, false, false, false, false, false, false, false];
        this.game.addEventListener(
            "stageChanged",
            this.updateBetValue.bind(this)
        );
        this.game.addEventListener(
            "cardAction",
            this.cardActionManager.bind(this)
        );
        this.game.addEventListener(
            "setBetting",
            this.setBettingManager.bind(this)
        );
    }

    resultSetting() {
        let playerHit = this.cardSlot.number[2] != 0;
        let bankerHit = this.cardSlot.number[5] != 0;
        let playerScore = this.cardSlot.getPlayerScore();
        let bankerScore = this.cardSlot.getBankerScore();
        this.results[0] =
            !playerHit && !bankerHit && (playerScore > 7 || bankerScore > 7);
        this.results[1] = bankerScore < playerScore;
        this.results[2] = bankerScore > playerScore;
        this.results[3] = bankerScore == playerScore;

        this.results[4] = bankerHit || playerHit;
        this.results[5] = !bankerHit && !playerHit;

        this.results[6] = bankerScore == 8 && playerScore == 8;
        this.results[7] = bankerHit && bankerScore == 7;
    }

    dividendSetting() {
        for (let i = 0; i < this.record.length; i++) {
            this.record[i] = this.results[i + 1]
                ? parseInt(this.record[i] * this.winningRatio[i])
                : 0;
        }
    }

    setBettingManager({ betIdx, betMoney }) {
        let diff = this.record[betIdx] - betMoney;
        this.game.setDiff(diff);
        this.record[betIdx] = betMoney;
        let isMainBet = this.record[0] + this.record[1] + this.record[2] > 0;
        this.game.setNextButtonStatus(isMainBet);
    }

    clear() {
        this.record = [0, 0, 0, 0, 0, 0, 0];
    }

    updateBetValue({ stage }) {
        switch (stage) {
            case 0:
                this.clear();
                break;
            default:
                break;
        }
    }

    async cardActionManager({ status }) {
        if (!status) {
            this.resultSetting();
            this.dividendSetting();
            await this.game.setResults(this.results, this.record);
            this.game.setNextButtonStatus(true);
        }
    }
}
