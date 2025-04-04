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

        let frames = [];
        const framePerImage = 7;

        for (let i = 0; i < framePerImage; i++) {
            frames.push({
                image: "back",
                x: i * 240,
                y: 0,
                width: 240,
                height: 360,
                duration: 1
            });
        }

        const frontFrames = [];

        for (let i = 0; i < framePerImage; i++) {
            frontFrames.push({
                image,
                x: i * 240,
                y: 0,
                width: 240,
                height: 360,
                duration: 1
            });
        }

        frontFrames.reverse();
        frames = frames.concat(frontFrames);

        this.animations.set("open", frames);
        this.animations.set("close", frames.toReversed());
    }

    onClick() {
        if (this.isAnimating) {
            return;
        }

        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
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
