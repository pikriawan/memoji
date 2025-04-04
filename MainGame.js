import Card from "./Card.js";
import Game from "./lib/Game.js";

const gameWidth = 320;
const gameHeight = 240;
const cardWidth = 40;
const cardHeight = cardWidth * 1.5;
const gap = 8;
const row = 2;
const column = 2;
const totalCardWidth = cardWidth * column + gap * (column - 1);
const totalCardHeight = cardHeight * row + gap * (row - 1);
const top = gameWidth * 0.5 - totalCardWidth * 0.5;
const left = gameHeight * 0.5 - totalCardHeight * 0.5;

export default class MainGame extends Game {
    constructor() {
        super(gameWidth, gameHeight);

        this.canvas.style.backgroundColor = "#F6F6F6";
    }

    preload() {
        this.loadImage("card-back", "images/card-back.png");

        for (let i = 1; i <= 30; i++) {
            this.loadImage("card-" + i, "images/card-" + i + ".png");
        }
    }

    create() {
        const cards = this.generateRandomCards(row * column);

        for (const card of cards) {
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

        for (let j = 0; j < column; j++) {
            for (let k = 0; k < row; k++) {
                const x = top + j * cardWidth + j * gap;
                const y = left + k * cardHeight + k * gap;
                cards.push(new Card(this, x, y, cardWidth, cardHeight, "card-" + cardsIndex[i]));
                i++;
            }
        }

        return cards;
    }
}
