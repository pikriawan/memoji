import Main from "./Main";
import Frame from "../lib/Frame";
import Picture from "../lib/Picture";
import Scene from "../lib/Scene";

export default class Loading extends Scene {
    preload() {
        const background = new Picture(
            this,
            new Frame("background", 0, 0, 2751, 1236),
            0,
            0,
            this.game.width,
            this.game.height
        );
        this.addObject(background);

        const logoWidth = 235.5;
        const logoHeigt = 101;
        const logo = new Picture(
            this,
            new Frame("logo", 0, 0, 471, 202),
            this.game.width * 0.5 - logoWidth * 0.5,
            0, // unspecified
            logoWidth,
            logoHeigt
        );

        const loadingWidth = 76.5;
        const loadingHeight = 16.5;
        const loading = new Picture(
            this,
            new Frame("loading", 0, 0, 153, 33),
            this.game.width * 0.5 - loadingWidth * 0.5,
            0, // unspecified
            loadingWidth,
            loadingHeight
        );

        const gapY = 32;
        const paddingY = (this.game.height - logoHeigt - gapY - loadingHeight) * 0.5;
        logo.y = paddingY;
        loading.y = paddingY + logoHeigt + gapY;
        this.addObject(logo);
        this.addObject(loading);
    }

    update() {
        if (this.game.imagesLoaded === this.game.images.size) {
            this.game.setScene(new Main(this.game));
        }
    }
}
