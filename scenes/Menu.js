import ButtonEasy from "../game-objects/ButtonEasy.js";
import ButtonHard from "../game-objects/ButtonHard.js";
import ButtonMedium from "../game-objects/ButtonMedium.js";
import Frame from "../lib/Frame.js";
import Picture from "../lib/Picture.js";
import Scene from "../lib/Scene.js";

export default class Menu extends Scene {
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

        const logoGapY = 32;
        const buttonGapY = 16;

        const logo = new Picture(this, new Frame("logo", 0, 0, 471, 202), null, null, 235, 101);
        const buttonEasy = new ButtonEasy(this, null, null);
        const buttonMedium = new ButtonMedium(this, null, null);
        const buttonHard = new ButtonHard(this, null, null);

        const totalHeight = logo.height +
            logoGapY +
            buttonEasy.height +
            buttonGapY +
            buttonMedium.height +
            buttonGapY +
            buttonHard.height;
        const paddingY = (this.game.height - totalHeight) * 0.5;
        let lastY = paddingY;

        logo.x = (this.game.width - logo.width) * 0.5;
        logo.y = lastY;
        this.addObject(logo);
        lastY += logo.height + logoGapY;

        buttonEasy.x = (this.game.width - buttonEasy.width) * 0.5;
        buttonEasy.y = lastY;
        this.addObject(buttonEasy);
        lastY += buttonEasy.height + buttonGapY;

        buttonMedium.x = (this.game.width - buttonMedium.width) * 0.5;
        buttonMedium.y = lastY;
        this.addObject(buttonMedium);
        lastY += buttonMedium.height + buttonGapY;

        buttonHard.x = (this.game.width - buttonHard.width) * 0.5;
        buttonHard.y = lastY;
        this.addObject(buttonHard);
    }
}
