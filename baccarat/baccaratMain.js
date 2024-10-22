import Baccarat from "./js/baccarat.js";
import { Modal } from "./js/modal.js";
import { BettingManager } from "./js/bettingManager.js";
import { MoneyBoard } from "./js/moneyBoard.js";
import { BettingTable } from "./js/bettingTable.js";
import { NextButton } from "./js/nextButton.js";
import { CardSlot } from "./js/cardSlot.js";
import { CardAction } from "./js/cardAction.js";
import { BustManager } from "./js/bustManager.js";

var game = new Baccarat();

document.addEventListener("DOMContentLoaded", async () => {
    const bettingTable = new BettingTable(game);
    const cardSlot = new CardSlot(game);
    const bettingManager = new BettingManager(game, cardSlot);
    const cardAction = new CardAction(game, cardSlot);
    const moneyBoard = new MoneyBoard(game);
    const nextButton = new NextButton(game);
    const modal = new Modal(game);
    const bustManager = new BustManager(game);
    modal.setupEventListeners();
    nextButton.setupEventListeners();
});
