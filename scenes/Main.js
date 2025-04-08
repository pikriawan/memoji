import Card from "../game-objects/Card";
import Frame from "../lib/Frame";
import Picture from "../lib/Picture";
import Scene from "../lib/Scene";

export default class MainScene extends Scene {
    create() {
        const background = new Picture(
            this,
            new Frame("background", 0, 0, 2751, 1236),
            0,
            0,
            this.game.width,
            this.game.height
        );
        this.addObject(background);

        const card = new Card(
            this,
            this.game.width * 0.5 - 40,
            this.game.height * 0.5 - 60,
            80,
            120
        );
        this.addObject(card);
    }
}
