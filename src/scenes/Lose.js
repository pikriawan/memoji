import ButtonBack from "../game-objects/ButtonBack.js";
import Frame from "../lib/Frame.js";
import Picture from "../lib/Picture.js";
import Scene from "../lib/Scene.js";

export default class Lose extends Scene {
    create() {
        const background = new Picture(
            this,
            new Frame("background", 0, 0, 2751, 1236),
            0,
            0,
            this.game.width,
            this.game.height
        );
        this.addObject(background);

        const gapY = 32;

        const lose = new Picture(
            this,
            new Frame("message-lose", 0, 0, 531, 84),
            null,
            null,
            177,
            28
        );
        const buttonBack = new ButtonBack(this, null, null);

        const totalHeight = lose.height + gapY + buttonBack.height;
        const paddingY = (this.game.height - totalHeight) * 0.5;
        let lastY = paddingY;

        lose.x = (this.game.width - lose.width) * 0.5;
        lose.y = lastY;
        this.addObject(lose);
        lastY += lose.height + gapY;

        buttonBack.x = (this.game.width - buttonBack.width) * 0.5;
        buttonBack.y = lastY;
        this.addObject(buttonBack);
    }
}
