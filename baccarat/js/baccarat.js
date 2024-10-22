import Deck from "./deck.js";

class Baccarat {
    constructor() {
        let startMoney = parseInt(Math.random() * 9000) + 1000;
        this.startMoney = startMoney;
        this.playerMoney = startMoney;
        this.deck = new Deck();
        this.eventListeners = {};
        this.round = 0;
        this.stage = 0;
        this.mainBet = false;
        this.deck.init();
        console.log(`Round ${this.round++}: ${this.playerMoney}`);
    }

    getPlayerMoney() {
        return this.playerMoney;
    }

    setBetting(betIdx, betMoney) {
        this.emitEvent("setBetting", {
            betIdx: betIdx,
            betMoney: betMoney,
        });
    }

    setResults(results, dividend) {
        return new Promise((resolve) => {
            this.emitEvent("setResults", {
                results: results,
                dividend: dividend,
                onComplete: resolve,
            });
        });
    }

    setNextButtonStatus(status) {
        this.emitEvent("btnNextStatus", {
            status: status,
        });
    }

    setCardAction(status) {
        this.emitEvent("cardAction", {
            status: status,
        });
    }

    setDiff(amount) {
        this.playerMoney += amount;
        this.emitEvent("moneyChanged", {
            playerMoney: this.playerMoney,
        });
    }

    updateStage() {
        this.stage = (this.stage + 1) % 4;
        this.emitEvent("stageChanged", {
            stage: this.stage,
        });
        if (this.stage == 3) {
            this.setCardAction(true);
        }
        if (!this.stage) {
            console.log(`Round ${this.round++}: ${this.playerMoney}`);
        }
    }

    setMainBet(isBet) {
        this.mainBet = isBet;
        this.emitEvent("mainBetChanged", {
            mainBet: this.mainBet,
        });
    }

    addEventListener(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    emitEvent(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach((callback) => callback(data));
        }
    }
}

export default Baccarat;
