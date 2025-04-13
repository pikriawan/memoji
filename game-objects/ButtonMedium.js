import Frame from "../lib/Frame.js";
import Sprite from "../lib/Sprite.js";
import Main from "../scenes/Main.js";

export default class ButtonMedium extends Sprite {
    constructor(scene, x, y) {
        super(scene, new Frame("button-medium", 0, 0, 568, 168), x, y, 189, 56);

        this.wasClicked = false;

        this.animations.set("press", [
            new Frame("button-medium", 568, 0, 568, 168)
        ]);

        this.animations.set("click", [
            new Frame("button-medium", 0, 0, 568, 168, 5)
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
        this.scene.game.playSound("click");
        this.scene.game.setScene(new Main(this.scene.game, Main.DIFFICULTY_MEDIUM));
    }
}
