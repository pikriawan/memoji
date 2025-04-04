import Card from "./Card.js";
import Game from "./lib/Game.js";

const cardWidth = 80;
const cardHeight = cardWidth * 1.5;
const top = 16;
const left = 16;
const gap = 16;
const row = 2;
const column = 4;

export default class MainGame extends Game {
    constructor() {
        super(720, 480);

        this.canvas.style.backgroundColor = "#F6F6F6";
    }

    preload() {
        this.loadImage("card-back", "images/card-back.png");

        for (let i = 1; i <= 30; i++) {
            this.loadImage("card-" + i, "images/card-" + i + ".png");
        }
    }

    create() {
        for (let i = 0; i < column; i++) {
            for (let j = 0; j < row; j++) {
                const x = left + i * (gap - 1) + i * cardWidth;
                const y = top + j * (gap - 1) + j * cardHeight;
                this.add(new Card(
                    this,
                    x,
                    y,
                    cardWidth,
                    cardHeight,
                    "card-" + (Math.floor(Math.random() * 30) + 1)
                ));
            }
        }
    }
}
