import Frame from "../lib/Frame";
import GameObject from "../lib/GameObject";

export default class MoveCounter extends GameObject {
    constructor(scene, counter, x, y) {
        super(scene, x, y, null, null);

        this.counter = counter;

        this.arrowsFrame = new Frame("arrows", 0, 0, 77, 77);
        this.arrowsWidth = 25;
        this.arrowsHeight = 25;
        this.arrowsGapX = 4;

        this.numberFrames = null;
        this.numbersWidth = null;
        this.numbersHeight = 56;
        this.numberWidth = 22;

        this.updateFrames();
    }

    generateFramesFromCounter(counter) {
        let digits = counter.toString().split("").map((digit) => parseInt(digit));
        const frames = [];

        for (let i = 0; i < digits.length; i++) {
            frames[i] = new Frame("numbers", digits[i] * 66, 0, 66, 168);
        }

        return frames;
    }

    updateFrames() {
        this.numberFrames = this.generateFramesFromCounter(this.counter);
        this.numbersWidth = 22 * this.numberFrames.length;
        this.width = this.arrowsWidth + this.arrowsGapX + this.numbersWidth;
        this.height = this.numbersHeight;
    }

    decrease() {
        if (this.counter > 0) {
            this.counter--;
        }

        this.updateFrames();
    }

    draw() {
        const arrowsImage = this.scene.game.images.get(this.arrowsFrame.imageKey);

        this.scene.game.context.drawImage(
            arrowsImage,
            this.arrowsFrame.x,
            this.arrowsFrame.y,
            this.arrowsFrame.width,
            this.arrowsFrame.height,
            this.x,
            this.y + (this.height - this.arrowsHeight) * 0.5,
            this.arrowsWidth,
            this.arrowsHeight
        );

        for (let i = 0; i < this.numberFrames.length; i++) {
            const numbersImage = this.scene.game.images.get(this.numberFrames[i].imageKey);

            this.scene.game.context.drawImage(
                numbersImage,
                this.numberFrames[i].x,
                this.numberFrames[i].y,
                this.numberFrames[i].width,
                this.numberFrames[i].height,
                this.x + this.arrowsWidth + this.arrowsGapX + this.numberWidth * i,
                this.y,
                this.numberWidth,
                this.numbersHeight
            );
        }
    }
}
