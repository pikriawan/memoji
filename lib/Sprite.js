import GameObject from "./GameObject";

export default class Sprite extends GameObject {
    constructor(scene, frame, x, y, width, height) {
        super(scene, x, y, width, height);

        this.frame = frame;
        this.animations = new Map();
        this.currentAnimation = null;
        this.isAnimating = false;
        this.frameIndex = 0;
        this.frameCounter = 0;
    }

    play(animationKey) {
        this.currentAnimation = animationKey;
        this.isAnimating = true;
    }

    update() {
        if (this.isAnimating) {
            const frames = this.animations.get(this.currentAnimation);
            const frame = frames[this.frameIndex];
            this.frame = frame;
            this.frameCounter++;

            if (this.frameCounter == frame.duration) {
                this.frameCounter = 0;
                this.frameIndex++;
            }

            if (this.frameIndex == frames.length) {
                this.currentAnimation = null;
                this.isAnimating = false;
                this.frameIndex = 0;
            }
        }
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
