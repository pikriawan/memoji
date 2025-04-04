import Sprite from "./lib/Sprite.js";

export default class Card extends Sprite {
    constructor(game, x, y, width, height, image) {
        super(
            game,
            x,
            y,
            width,
            height,
            {
                image: "back",
                x: 0,
                y: 0,
                width: 240,
                height: 360
            }
        );

        this.image = image;
        this.isOpen = false;
        this.isClosing = false;
        this.closeCounter = 0;
        this.closeDuration = 120;

        const frames = [];

        for (let i = 0; i < 15; i++) {
            frames.push({
                image: "back",
                x: i * 240,
                y: 0,
                width: 240,
                height: 360,
                duration: 1
            });
        }

        for (let i = 14; i > -1; i--) {
            frames.push({
                image,
                x: i * 240,
                y: 0,
                width: 240,
                height: 360,
                duration: 1
            });
        }

        this.animations.set("open", frames);
        this.animations.set("close", frames.toReversed());
    }

    onClick() {
        this.isDisabled = true;
        this.open();
    }

    update() {
        super.update();

        if (this.isClosing) {
            this.closeCounter++;
        }

        if (this.closeCounter >= this.closeDuration) {
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
