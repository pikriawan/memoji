import ButtonBack from "../game-objects/ButtonBack";
import Frame from "../lib/Frame";
import Picture from "../lib/Picture";
import Scene from "../lib/Scene";

export default class Win extends Scene {
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

        const win = new Picture(
            this,
            new Frame("message-win", 0, 0, 632, 100),
            null,
            null,
            210,
            33
        );
        const buttonBack = new ButtonBack(this, null, null);

        const totalHeight = win.height + gapY + buttonBack.height;
        const paddingY = (this.game.height - totalHeight) * 0.5;
        let lastY = paddingY;

        win.x = (this.game.width - win.width) * 0.5;
        win.y = lastY;
        this.addObject(win);
        lastY += win.height + gapY;

        buttonBack.x = (this.game.width - buttonBack.width) * 0.5;
        buttonBack.y = lastY;
        this.addObject(buttonBack);
    }
}
