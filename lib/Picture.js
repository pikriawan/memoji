import GameObject from "./GameObject.js";

export default class Picture extends GameObject {
    constructor(scene, imageKey, x, y, width, height) {
        super(scene, x, y);

        this.imageKey = imageKey;
        this.width = width;
        this.height = height;
    }

    draw() {
        const image = this.scene.game.images.get(this.imageKey);

        this.scene.game.context.drawImage(
            image,
            0,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
