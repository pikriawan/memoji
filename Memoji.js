import Game from "./lib/Game";

export default class Memoji extends Game {
    preload() {
        this.loadImage("background", "images/background.png");
        this.loadImage("logo", "images/logo.png");
        this.loadImage("loading", "images/loading.png");
        this.loadImage("card-back", "images/card-back.png");

        for (let i = 1; i <= 30; i++) {
            this.loadImage("card-" + i, "images/card-" + i + ".png");
        }
    }
}
