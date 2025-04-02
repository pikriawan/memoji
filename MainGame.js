import Card from "./Card.js";
import Game from "./lib/Game.js";

export default class MainGame extends Game {
    constructor() {
        super(240, 320);
    }

    preload() {
        this.loadImage("back", "images/back.png");
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
            cardHeight,
            {
                image: "back",
                x: 0,
                y: 0,
                width: 240,
                height: 360
            }
        );

        this.add(card);
    }
}
