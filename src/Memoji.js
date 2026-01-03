import Game from "./lib/Game.js";

export default class Memoji extends Game {
    preload() {
        this.loadImage("background", "images/background.png");
        this.loadImage("logo", "images/logo.png");
        this.loadImage("button-easy", "images/button-easy.png");
        this.loadImage("button-medium", "images/button-medium.png");
        this.loadImage("button-hard", "images/button-hard.png");
        this.loadImage("button-back", "images/button-back.png");
        this.loadImage("arrows", "images/arrows.png");
        this.loadImage("numbers", "images/numbers.png");
        this.loadImage("card-back", "images/card-back.png");
        this.loadImage("message-lose", "images/lose.png");
        this.loadImage("message-win", "images/win.png");

        for (let i = 1; i <= 30; i++) {
            this.loadImage("card-" + i, "images/card-" + i + ".png");
        }

        this.loadSound("click", "sounds/click.wav");
        this.loadSound("flip", "sounds/flip.wav");
        this.loadSound("lose", "sounds/lose.wav");
        this.loadSound("win", "sounds/win.wav");
    }
}
