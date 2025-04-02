import Card from "./Card.js";
import Game from "./lib/Game.js";

export default class Main extends Game {
    constructor() {
        super(240, 320);
    }

    preload() {
        this.loadImage("card-1", "images/card-1.png");
    }

    create() {
        const cardWidth = 80;
        const cardHeight = 120;

        const card = new Card(
            this,
            this.width * 0.5 - cardWidth * 0.5,
            this.height * 0.5 - cardHeight * 0.5,
            cardWidth,
            cardHeight
        );

        this.addGameObject(card);
    }
}
