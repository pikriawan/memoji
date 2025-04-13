export default class GameObject {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.eventHandlers = new Map();
    }

    on(eventName, listener) {
        const actualListener = (event) => {
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX - rect.x;
            const y = event.clientY - rect.y;

            if (
                x >= this.x &&
                x <= this.x + this.width &&
                y >= this.y &&
                y <= this.y + this.height
            ) {
                listener(event);
            }
        };

        if (!this.eventHandlers.has(eventName)) {
            this.eventHandlers.set(eventName, new Map());
        }

        this.eventHandlers.get(eventName).set(listener, actualListener);
        this.scene.game.canvas.addEventListener(eventName, actualListener);
    }

    off(eventName, listener) {
        if (this.eventHandlers.has(eventName) && this.eventHandlers.get(eventName).get(listener)) {
            this.scene.game.canvas.removeEventListener(eventName, this.eventHandlers.get(eventName).get(listener));
            this.eventHandlers.get(eventName).delete(listener);

            if (this.eventHandlers.get(eventName).size === 0) {
                this.eventHandlers.delete(eventName);
            }
        }
    }

    destroy() {
        for (const [eventName, eventHandler] of this.eventHandlers.entries()) {
            for (const actualListener of eventHandler.values()) {
                this.scene.game.canvas.removeEventListener(eventName, actualListener);
            }
        }

        this.eventHandlers.clear();
    }
}
