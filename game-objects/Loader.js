import GameObject from "../lib/GameObject";

export default class Loader extends GameObject {
    constructor(scene, x, y) {
        super(scene, x, y, 200, 10);

        this.progress = 0;
    }

    update() {
        this.progress = this.scene.game.imagesLoaded / this.scene.game.images.size;
    }

    draw() {
        this.scene.game.context.beginPath();
        this.scene.game.context.rect(this.x, this.y, this.width, this.height);
        this.scene.game.context.strokeStyle = "white";
        this.scene.game.context.stroke();
        this.scene.game.context.closePath();

        this.scene.game.context.beginPath();
        this.scene.game.context.rect(this.x, this.y, this.progress * this.width, this.height);
        this.scene.game.context.fillStyle = "white";
        this.scene.game.context.fill();
        this.scene.game.context.closePath();
    }
}
