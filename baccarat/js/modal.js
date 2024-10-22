import { chipSetter } from "./chipSetter.js";

export class Modal {
    constructor(game) {
        this.game = game;
        this.modal = document.querySelector("#popupChip");
        this.arrows = document.querySelectorAll(".arrow");
        this.betTotalNum = document.querySelector(".betTotalNum");
        this.betTotalChipSlot = document.querySelector(".betTotalChipSlot");
        this.betTotalChipSlotExample = document.querySelector(
            ".betTotalChipSlotExample"
        );
        this.betIdx = 0;
        this.total = 0;
        this.currentBalance = 0;
    }

    confirm() {
        this.game.setBetting(this.betIdx, parseInt(this.total));
    }

    updateChips() {
        chipSetter(
            this.total,
            this.betTotalChipSlot,
            this.betTotalChipSlotExample,
            5,
            550,
            10
        );
    }

    open(betIdx, currentBalance) {
        this.betIdx = betIdx;
        this.currentBalance = currentBalance;
        this.betTotalNum.textContent = "$0";
        this.total = 0;
        this.betTotalChipSlot
            .querySelectorAll(".clonebetTotalChipSlot")
            .forEach((el) => el.remove());
        this.modal.style.display = "flex";
        this.modal.style.animation = "fadeIn 0.4s ease-in-out forwards";
    }

    close() {
        this.modal.style.animation = "fadeOut 0.4s ease-in-out forwards";
    }

    arrowEvent(chipValue) {
        this.total = Math.min(chipValue + this.total, this.currentBalance);
        if (this.total < 0) this.total = 0;
        this.betTotalNum.textContent = `$${this.total}`;
        this.updateChips();
    }

    setupEventListeners() {
        document.querySelector("#confirm").addEventListener("click", () => {
            this.confirm();
            this.close();
        });

        document.querySelector("#close").addEventListener("click", () => {
            this.close();
        });

        let buttons = document.querySelectorAll(".bet_body");
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.addEventListener("click", () => {
                this.open(i, this.game.getPlayerMoney());
            });
        }

        let chips = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 25000];
        for (let i = 0; i < this.arrows.length / 2; i++) {
            const left_arrow = this.arrows[i * 2];
            const right_arrow = this.arrows[i * 2 + 1];
            left_arrow.addEventListener("click", () => {
                this.arrowEvent(chips[i] * -1);
            });
            right_arrow.addEventListener("click", () => {
                this.arrowEvent(chips[i]);
            });
        }
    }
}
