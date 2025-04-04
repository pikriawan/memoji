import Card from "./Card.js";
import Game from "./lib/Game.js";

export default class MainGame extends Game {
    constructor(width, height, row, column) {
        super(width, height);

        this.cardWidth = 70;
        this.cardHeight = 105;
        this.gap = 8;
        this.row = row;
        this.column = column;
        this.totalCardWidth = this.cardWidth * this.column + this.gap * (this.column - 1);
        this.totalCardHeight = this.cardHeight * this.row + this.gap * (this.row - 1);
        this.cardLeft = this.width * 0.5 - this.totalCardWidth * 0.5;
        this.cardTop = this.height * 0.5 - this.totalCardHeight * 0.5;

        this.cards = [];
        this.pendingCard = null;

        this.canvas.style.backgroundColor = "#F6F6F6";
    }

    preload() {
        this.loadImage("card-back", "images/card-back.png");

        for (let i = 1; i <= 30; i++) {
            this.loadImage("card-" + i, "images/card-" + i + ".png");
        }
    }

    create() {
        this.cards = this.generateRandomCards(this.row * this.column);

        for (const card of this.cards) {
            this.add(card);
        }
    }

    generateRandomCardsIndex(length) {
        const indexes = [];
        const randomIndexes = [];

        for (let i = 0; i < 30; i++) {
            indexes.push(i + 1);
        }

        while (indexes.length !== 0) {
            const random = Math.floor(Math.random() * indexes.length);
            randomIndexes.push(indexes[random]);
            indexes.splice(random, 1);
        }

        return randomIndexes.slice(0, length);
    }

    shuffle(array) {
        const indexes = [];
        const randomArray = [];

        for (let i = 0; i < array.length; i++) {
            indexes.push(i);
        }

        while (indexes.length !== 0) {
            const random = Math.floor(Math.random() * indexes.length);
            randomArray.push(array[indexes[random]]);
            indexes.splice(random, 1);
        }

        return randomArray;
    }

    generateRandomCards(length) {
        let cardsIndex = this.generateRandomCardsIndex(length * 0.5);
        cardsIndex = cardsIndex.concat(cardsIndex);
        cardsIndex = this.shuffle(cardsIndex);

        const cards = [];

        let i = 0;

        for (let j = 0; j < this.column; j++) {
            for (let k = 0; k < this.row; k++) {
                const x = this.cardLeft + j * this.cardWidth + j * this.gap;
                const y = this.cardTop + k * this.cardHeight + k * this.gap;
                cards.push(new Card(this, x, y, this.cardWidth, this.cardHeight, "card-" + cardsIndex[i]));
                i++;
            }
        }

        return cards;
    }
}
