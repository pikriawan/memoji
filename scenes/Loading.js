import Loader from "../game-objects/Loader";
import Scene from "../lib/Scene";
import Menu from "./Menu";

export default class Loading extends Scene {
    constructor(game) {
        super(game);

        this.redirectDelay = 60;
        this.redirectCounter = 0;
    }

    preload() {
        const loader = new Loader(this, null, null);
        loader.x = (this.game.width - loader.width) * 0.5;
        loader.y = (this.game.height - loader.height) * 0.5;
        this.addObject(loader);
    }

    update() {
        this.redirectCounter++;

        if (this.redirectCounter >= this.redirectDelay) {
            if (this.game.imagesLoaded === this.game.images.size) {
                this.game.setScene(new Menu(this.game));
            }
        }
    }
}
