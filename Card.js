import Sprite from "./lib/Sprite.js";

export default class Card extends Sprite {
    constructor(game, x, y, width, height, frame) {
        super(game, x, y, width, height, frame);

        this.isOpen = false;

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
                image: "card-1",
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

    onClick(event) {
        if (this.isAnimating) {
            return;
        }

        if (this.isOpen) {
            this.isOpen = false;
            this.play("close");
        } else {
            this.isOpen = true;
            this.play("open");
        }
    }
}
