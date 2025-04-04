import Card from "./Card.js";
import Game from "./lib/Game.js";

const cardWidth = 80;
const cardHeight = cardWidth * 1.5;
const margin = 16;
const gap = 16;
const row = 2;
const column = 4;
const gameWidth = margin * 2 + cardWidth * column + gap * (column - 1);
const gameHeight = margin * 2 + cardHeight * row + gap * (row - 1);

export default class MainGame extends Game {
    constructor() {
        super(gameWidth, gameHeight);
    }

    // preload() {
    //     this.loadImage("back", "images/back.png");

    //     for (let i = 1; i <= 30; i++) {
    //         this.loadImage("card-" + i, "images/card-" + i + ".png");
    //     }
    // }

    // create() {
    //     const cards = [];

    //     for (let i = 0; i < column; i++) {
    //         for (let j = 0; j < row; j++) {
    //             const x = margin + i * (gap + cardWidth);
    //             const y = margin + j * (gap + cardHeight);
    //             cards.push(new Card(this, x, y, cardWidth, cardHeight, "card-" + (Math.floor(Math.random() * 30) + 1)));
    //         }
    //     }

    //     for (const card of cards) {
    //         this.add(card);
    //     }
    // }

    preload() {
        this.loadImage("back", "images/back-short.png");
        this.loadImage("card", "images/card-1-short.png");
    }

    create() {
        this.add(new Card(this, 16, 16, cardWidth, cardHeight, "card"));
    }
}
