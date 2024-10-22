import { chipSetter } from "./chipSetter.js";

export class BettingTable {
    constructor(game) {
        this.game = game;
        this.buttons = document.querySelectorAll(".bet_body");
        this.naturalLogo = document.querySelector(".bet_head img");
        this.betChipSlot = document.querySelectorAll(".betChipSlot");
        this.betChipExample = document.querySelector(".betChipExample");
        this.betMoneyNum = document.querySelectorAll(".betMoneyNum");
        this.game.addEventListener(
            "stageChanged",
            this.updateButtonActive.bind(this)
        );
        this.game.addEventListener(
            "setResults",
            this.resultsManager.bind(this)
        );
        this.game.addEventListener(
            "setBetting",
            this.setBettingManager.bind(this)
        );
    }

    init() {
        this.naturalLogo.classList.remove("show");
        document
            .querySelectorAll(".clonebetChipSlot")
            .forEach((el) => el.remove());
        for (let i = 0; i < 7; i++) {
            this.buttons[i].classList.remove("bet_win");
            this.buttons[i].classList.remove("bet_loss");
            this.betMoneyNum[i].textContent = "$0";
        }
    }

    activeButton(nums) {
        nums.forEach((num) => {
            this.buttons[num].classList.remove("bet_body_disable");
            this.buttons[num].classList.add("bet_body_able");
        });
    }

    deactiveAllButton() {
        this.buttons.forEach((btn) => {
            btn.classList.remove("bet_body_able");
            btn.classList.add("bet_body_disable");
        });
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    setBettingManager({ betIdx, betMoney }) {
        const chipSlot = this.betChipSlot[betIdx];
        chipSetter(betMoney, chipSlot, this.betChipExample, 2, 255, 10);
        this.betMoneyNum[betIdx].textContent = `$${betMoney}`;
    }

    async resultsManager({ results, dividend, onComplete }) {
        if (results[0]) {
            this.naturalLogo.classList.add("show");
        }
        for (let i = 1; i < results.length; i++) {
            var buttonClass = "bet_loss";
            if (results[i]) {
                buttonClass = "bet_win";
                this.game.setDiff(dividend[i - 1]);
            }
            this.buttons[i - 1].classList.add(buttonClass);
            await this.sleep(170);
        }
        onComplete();
    }

    updateButtonActive({ stage }) {
        this.deactiveAllButton();
        switch (stage) {
            case 0:
                this.init();
                break;
            case 1:
                this.activeButton([0, 1, 2]);
                break;
            case 2:
                this.activeButton([3, 4, 5, 6]);
                break;
            default:
                break;
        }
    }
}
