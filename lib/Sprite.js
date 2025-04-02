import GameObject from "./GameObject.js";

export default class Sprite extends GameObject {
    constructor(game, x, y, width, height, frame) {
        super(game, x, y, width, height);

        this.frame = frame;
        this.animations = new Map();
        this.isAnimating = false;
        this.frameCounter = 0;
    }

    update() {}

    draw() {
        const image = this.game.images.get(this.frame.image);

        this.game.context.drawImage(
            image,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
