import { chipSetter } from "./chipSetter.js";

export class MoneyBoard {
    constructor(game) {
        this.game = game;
        this.chipSlot = document.querySelector(".chipSlot");
        this.chipSlotNum = document.querySelector(".chipSlotNum");
        this.chipExample = document.querySelector(".chipExample");
        this.game.addEventListener(
            "moneyChanged",
            this.updateMoneyDisplay.bind(this)
        );
        this.game.setDiff(0);
    }

    updateMoneyDisplay({ playerMoney }) {
        this.chipSlotNum.textContent = `$${playerMoney}`;
        chipSetter(playerMoney, this.chipSlot, this.chipExample, 5, 680, 15);
    }
}
