import MoveCounter from "../game-objects/MoveCounter";
import Frame from "../lib/Frame";
import Picture from "../lib/Picture";
import Scene from "../lib/Scene";

export default class MainScene extends Scene {
    constructor(game) {
        super(game);

        this.moveCounter = null;
    }

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

        this.moveCounter = new MoveCounter(this, 10, 0, 0);
    }
}
