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
        this.objects = new Set();
        this.images = new Map();
        this.isPaused = false;
        this.isDisabled = false;
        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        this.startTime = null;
        this.currentTime = null;

        this.preload();
        this.handleLoadImages();
    }

    animate(timestamp) {
        if (this.isPaused) {
            return;
        }

        requestAnimationFrame(this.animate);

        this.currentTime = timestamp;

        if (this.startTime === null) {
            this.startTime = this.currentTime;
        }

        const elapsed = this.currentTime - this.startTime;

        if (elapsed > this.fpsInterval) {
            this.startTime = this.currentTime - (elapsed % this.fpsInterval);

            this.context.clearRect(0, 0, this.width, this.height);

            for (const object of this.objects) {
                object.update();
                object.draw();
            }

            this.update();
        }
    }

    add(object) {
        this.objects.add(object);
    }

    loadImage(key, src) {
        const image = new Image();
        image.src = src;
        this.images.set(key, image);
    }

    async handleLoadImages() {
        const images = [];

        for (const image of this.images.values()) {
            images.push(image);
        }

        await Promise.all(images.map((image) => new Promise((resolve) => image.addEventListener("load", resolve))));
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

        for (const object of this.objects) {
            if (
                x >= object.x &&
                x <= object.x + object.width &&
                y >= object.y &&
                y <= object.y + object.height &&
                !object.isDisabled
            ) {
                object.onClick(event);
            }
        }
    }

    onClick() {}

    pause() {
        this.isPaused = true;
        this.startTime = null;
        this.currentTime = null;
    }

    resume() {
        this.isPaused = false;
        requestAnimationFrame(this.animate);
    }

    preload() {}

    create() {}

    update() {}
}
