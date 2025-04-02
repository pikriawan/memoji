export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width * devicePixelRatio;
        this.canvas.height = this.height * devicePixelRatio;
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";
        this.canvas.style.touchAction = "none";
        this.canvas.style.backgroundColor = "black";
        document.body.append(this.canvas);

        this.context = this.canvas.getContext("2d");
        this.context.scale(devicePixelRatio, devicePixelRatio);

        this.animate = this.animate.bind(this);
        this.clickListener = this.clickListener.bind(this);
        this.gameObjects = new Set();
        this.images = new Map();
        this.isPaused = false;
        this.isDisabled = false;

        this.preload();
        this.handleLoadImages();
    }

    animate() {
        this.context.clearRect(0, 0, this.width, this.height);

        for (const gameObject of this.gameObjects) {
            gameObject.update();
            gameObject.draw();
        }

        this.update();

        if (!this.isPaused) {
            requestAnimationFrame(this.animate);
        }
    }

    addGameObject(gameObject) {
        this.gameObjects.add(gameObject);
    }

    loadImage(key, src) {
        const image = new Image();
        image.src = src;
        this.images.set(key, image);
    }

    async handleLoadImages() {
        await Promise.all(this.images.values().map((image) => new Promise((resolve) => image.addEventListener("load", resolve))));
        this.onImagesLoaded();
    }

    onImagesLoaded() {
        this.create();
        this.canvas.addEventListener("click", this.clickListener);

        if (!this.isPaused) {
            requestAnimationFrame(this.animate);
        }
    }

    clickListener(event) {
        const rect = event.target.getBoundingClientRect();

        const x = event.clientX - rect.x;
        const y = event.clientY - rect.y;

        if (!this.isDisabled) {
            this.onClick(event);
        }

        for (const gameObject of this.gameObjects) {
            if (
                x >= gameObject.x &&
                x <= gameObject.x + gameObject.width &&
                y >= gameObject.y &&
                y <= gameObject.y + gameObject.height &&
                !gameObject.isDisabled
            ) {
                gameObject.onClick(event);
            }
        }
    }

    onClick(event) {}

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
        requestAnimationFrame(this.animate);
    }

    preload() {}

    create() {}

    update() {}
}
