import Card from "./Card.js";
import CardValue from "./CardValue.js";
import Game from "./lib/Game.js";

export default class MainGame extends Game {
    constructor() {
        super(496, 288);
    }

    preload() {
        this.loadImage("back", "images/back.png");
        this.loadImage("card-1", "images/card-1.png");
        this.loadImage("card-2", "images/card-2.png");
        this.loadImage("card-3", "images/card-3.png");
        this.loadImage("card-4", "images/card-4.png");
        this.loadImage("card-5", "images/card-5.png");
    }

    create() {
        const margin = 16;
        const gap = 16;
        const cards = [];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 2; j++) {
                const x = margin + i * (gap + 80);
                const y = margin + j * (gap + 120);
                cards.push(new Card(this, x, y, CardValue.Card2));
            }
        }

        for (const card of cards) {
            this.add(card);
        }
    }
}
