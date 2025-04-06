import Game from "./lib/Game.js";

export default class MainGame extends Game {
    preload() {
        this.loadImage("card-back", "images/card-back.png");
        this.loadImage("card-1", "images/card-1.png");
    }
}
