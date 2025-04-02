import GameObject from "./lib/GameObject.js";

export default class Card extends GameObject {
    constructor(game, x, y, width, height) {
        super(game, x, y, width, height);

        this.maxFrame = 14;
        this.frame = this.maxFrame;
        this.frameFactor = 1;
        this.frameDelay = 5;
        this.frameCount = 0;
        this.isAnimating = false;
        this.isOpen = false;
        this.isClosing = false;
        this.closeDelay = 120;
        this.closeCount = 0;
    }

    update() {
        if (this.frameCount >= this.frameDelay) {
            this.frameCount = 0;
        }

        this.frameCount++;

        if (this.isAnimating) {
            this.frame += this.frameFactor;
        }

        if (this.frame === 0 || this.frame === this.maxFrame) {
            this.isAnimating = false;
            this.isDisabled = false;
        }

        if (this.isClosing) {
            this.closeCount++;
        }

        if (this.closeCount >= this.closeDelay) {
            this.isClosing = false;
            this.closeCount = 0;
            this.animateClose();
        }
    }

    draw() {
        const mushroom = this.game.images.get("card-1");

        this.game.context.drawImage(
            mushroom,
            this.frame * 240,
            0,
            240,
            360,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    open() {
        this.animateOpen();
    }

    close() {
        this.isClosing = false;
        this.closeCount = 0;
        this.animateClose();
    }

    closeLazy() {
        this.isClosing = true;
    }

    animateOpen() {
        this.isOpen = true;
        this.isDisabled = true;
        this.isAnimating = true;
        this.frame = this.maxFrame;
        this.frameFactor = -1;
    }

    animateClose() {
        this.isOpen = false;
        this.isDisabled = true;
        this.isAnimating = true;
        this.frame = 0;
        this.frameFactor = 1;
    }

    onClick(event) {
        if (this.isOpen) {
            this.close();
        } else {
            this.animateOpen();
            this.closeLazy();
        }
    }
}
