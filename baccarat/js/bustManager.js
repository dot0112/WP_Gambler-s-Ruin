export class BustManager {
    constructor(game) {
        this.game = game;
        this.bustedUi = document.querySelector(".over");
        this.game.addEventListener("stageChanged", this.bust.bind(this));
    }

    bust({ stage }) {
        if (stage == 0) {
            if (this.game.playerMoney == 0) {
                this.bustedUi.classList.add("show");
                this.bustedUi.addEventListener("click", () => {
                    window.location.href = "/";
                });
            }
        }
    }
}
