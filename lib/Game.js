export default class Game {
    constructor(width, height, Scene) {
        this.width = width;
        this.height = height;

        this.scene = new Scene(this);

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

        this.images = new Map();
        this.imagesLoaded = 0;

        this.isPaused = false;

        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        this.startTime = null;
        this.currentTime = null;

        if (this.preload) {
            this.preload();
        }

        this.addImagesLoadListener();
    }

    animate(timestamp) {
        if (this.isPaused) {
            return;
        }

        requestAnimationFrame(this.animate.bind(this));

        this.currentTime = timestamp;

        if (this.startTime === null) {
            this.startTime = this.currentTime;
        }

        const elapsed = this.currentTime - this.startTime;

        if (elapsed > this.fpsInterval) {
            this.startTime = this.currentTime - (elapsed % this.fpsInterval);

            this.loop();
        }
    }

    loop() {
        this.context.clearRect(0, 0, this.width, this.height);

        if (this.scene.update) {
            this.scene.update();
        }
    }

    addImagesLoadListener() {
        for (const image of this.images.values()) {
            image.addEventListener("load", () => {
                this.imagesLoaded++;

                if (this.imagesLoaded == this.images.size) {
                    this.onImagesLoaded();
                }
            });
        }
    }

    onImagesLoaded() {
        if (this.scene.create) {
            this.scene.create();
        }

        if (!this.isPaused) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    loadImage(key, src) {
        const image = new Image();
        image.src = src;
        this.images.set(key, image);
    }
}
