import Frame from "./lib/Frame.js";
import Scene from "./lib/Scene.js";
import Sprite from "./lib/Sprite.js";

function reverse(array) {
    const result = array.slice();
    return result.reverse();
}

class Card extends Sprite {
    constructor(scene, x, y, width, height) {
        super(scene, new Frame("card-back", 0, 0, 240, 360), x, y, width, height);

        this.isOpen = false;
        this.isDisabled = false;
        this.isClosing = false;
        this.closeDelay = 60;
        this.closeCounter = 0;

        const frames = [];

        for (let i = 0; i < 7; i++) {
            frames.push(new Frame("card-back", i * 240, 0, 240, 360));
        }

        for (let i = 7; i > 0; i--) {
            frames.push(new Frame("card-1", (i - 1) * 240, 0, 240, 360));
        }

        this.animations.set("open", frames);
        this.animations.set("close", reverse(frames));

        this.on("click", () => {
            if (this.isDisabled) {
                return;
            }

            if (this.isOpen) {
                this.isClosing = false;
                this.closeCounter = 0;
                this.close();
            } else {
                this.open();
                this.closeLazy();
            }
        });
    }

    update() {
        super.update();

        this.isDisabled = this.isAnimating;

        if (this.isClosing) {
            this.closeCounter++;
        }

        if (this.closeCounter >= this.closeDelay) {
            this.closeCounter = 0;
            this.isClosing = false;
            this.close();
        }
    }

    open() {
        this.isOpen = true;
        this.play("open");
    }

    close() {
        this.isOpen = false;
        this.play("close");
    }

    closeLazy() {
        this.isClosing = true;
    }
}

export default class MainScene extends Scene {
    create() {
        const card = new Card(this, 16, 16, 80, 120);
        this.addObject(card);
    }
}
