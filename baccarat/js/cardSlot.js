export class CardSlot {
    constructor(game) {
        this.game = game;
        this.card = document.querySelectorAll(".card");
        this.suits = [0, 0, 0, 0, 0, 0];
        this.number = [0, 0, 0, 0, 0, 0];
        this.frontImgDir = "/images/cards/";
    }

    init() {
        for (let i = 0; i < 6; i++) {
            if (this.number[i] == 0) continue;
            this.suits[i] = 0;
            this.number[i] = 0;
            this.card[i].classList.remove("flipped");
            this.card[i].classList.remove("draw");
            this.card[i].classList.add("undraw");
        }
    }

    getPlayerScore() {
        var total = 0;
        for (let i = 0; i < 3; i++) {
            var score =
                this.number[i] *
                (this.number[i] == this.number[i] % 10 ? 1 : 0);
            total = (total + score) % 10;
        }
        return total;
    }

    getBankerScore() {
        var total = 0;
        for (let i = 3; i < 6; i++) {
            var score =
                this.number[i] *
                (this.number[i] == this.number[i] % 10 ? 1 : 0);
            total = (total + score) % 10;
        }
        return total;
    }

    setCard(idx) {
        let drawCard = this.game.deck.drawCard();

        this.suits[idx] = drawCard[0];
        this.number[idx] = drawCard[1];

        let degree = Math.floor(Math.random() * 11) - 5.5;
        var card = this.card[idx];
        card.style.setProperty("--front_rotation", degree + "deg");
        card.style.setProperty("--back_rotation", -1 * degree + "deg");
        card.style.animation = "none";
        card.offsetHeight;
        card.style.animation = "Draw 0.8s forwards";
        card.classList.remove("undraw");
        card.classList.add("draw");
        card.querySelector("#front").src = this.getImagePath(idx);
    }

    flipCard(idx) {
        this.card[idx].classList.add("flipped");
    }

    getImagePath(idx) {
        var suitsName = {
            0: "clubs",
            1: "diamonds",
            2: "hearts",
            3: "spades",
        };
        var honourName = {
            1: "ace",
            11: "jack",
            12: "queen",
            13: "king",
        };
        let path =
            this.frontImgDir +
            (honourName[this.number[idx]] || this.number[idx]) +
            "_of_" +
            suitsName[this.suits[idx]] +
            ".png";
        return path;
    }
}
