import GameObject from "./GameObject";

export default class Picture extends GameObject {
    constructor(scene, frame, x, y, width, height) {
        super(scene, x, y, width, height);

        this.frame = frame;
    }

    draw() {
        const image = this.scene.game.images.get(this.frame.imageKey);

        this.scene.game.context.drawImage(
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
