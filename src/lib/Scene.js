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

    destroy() {
        for (const object of this.objects) {
            this.removeObject(object);
        }
    }
}
