export default class Scene {
    constructor(game) {
        this.game = game;

        this.isCreated = false;
        this.objects = new Set();
    }

    loop() {
        for (const object of this.objects.values()) {
            if (object.update) {
                object.update();
            }

            if (object.draw) {
                object.draw();
            }
        }
    }

    addObject(object) {
        this.objects.add(object);
    }

    removeObject(object) {
        object.destroy();
        this.objects.delete(object);
    }

    loadImage(key, src) {
        const image = {
            asset: new Image(),
            isLoaded: false
        };
        image.asset.src = src;

        image.asset.addEventListener("load", () => {
            image.isLoaded = true;
        });

        this.game.images.set(key, image);
    }

    loadSound(key, src) {
        const sound = {
            asset: new Audio(src),
            isLoaded: false
        };
        sound.asset.addEventListener("canplaythrough", () => {
            sound.isLoaded = true;
        });

        this.game.sounds.set(key, sound);
    }

    playSound(soundKey) {
        let sound = this.game.sounds.get(soundKey);

        if (sound.asset instanceof Audio) {
            sound = new Audio(sound.asset.src);
            sound.play();
        }
    }

    destroy() {
        for (const object of this.objects) {
            this.removeObject(object);
        }
    }
}
