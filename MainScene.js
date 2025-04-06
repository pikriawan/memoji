import Picture from "./lib/Picture.js";
import Scene from "./lib/Scene.js";

export default class MainScene extends Scene {
    create() {
        const card = new (class extends Picture {
            draw() {
                const image = this.scene.game.images.get(this.imageKey);

                this.scene.game.context.drawImage(
                    image,
                    0,
                    0,
                    240,
                    360,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
        })(this, "card-back", 16, 16, 80, 120);
        this.addObject(card);
    }
}
