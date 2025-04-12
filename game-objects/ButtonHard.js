import Frame from "../lib/Frame";
import Sprite from "../lib/Sprite";

export default class ButtonHard extends Sprite {
    constructor(scene, x, y) {
        super(scene, new Frame("button-hard", 0, 0, 568, 168), x, y, 189, 56);

        this.wasClicked = false;

        this.animations.set("press", [
            new Frame("button-hard", 568, 0, 568, 168)
        ]);

        this.animations.set("click", [
            new Frame("button-hard", 0, 0, 568, 168, 10)
        ]);

        this.on("pointerdown", () => {
            this.play("press");
        });

        this.on("pointerup", () => {
            this.play("click");
            this.wasClicked = true;
        });
    }

    update() {
        super.update();

        if (this.currentAnimation === null && this.wasClicked) {
            this.wasClicked = false;
            this.onClick();
        }
    }

    onClick() {
        alert("hahaha");
    }
}
