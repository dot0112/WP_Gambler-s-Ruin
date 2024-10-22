export class NextButton {
    constructor(game) {
        this.game = game;
        this.nextButton = document.querySelector("#btn_next");
        this.game.addEventListener(
            "btnNextStatus",
            this.updateButtonStatus.bind(this)
        );
        this.game.addEventListener(
            "stageChanged",
            this.updateStageActive.bind(this)
        );
    }

    updateButtonStatus({ status }) {
        if (status) this.nextButton.classList.remove("btnDisable");
        else this.nextButton.classList.add("btnDisable");
    }

    updateStageActive({ stage }) {
        this.updateButtonStatus({ status: stage != 1 });
    }
    setupEventListeners() {
        this.nextButton.addEventListener("click", () => {
            this.game.updateStage();
        });
    }
}
