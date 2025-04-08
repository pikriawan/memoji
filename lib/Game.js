export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.scene = null;

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
        this.isAllImagesLoaded = false;

        this.isPaused = false;

        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        this.startTime = null;
        this.currentTime = null;

        requestAnimationFrame(this.animate.bind(this));

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

        if (this.scene) {
            if (this.isAllImagesLoaded && !this.scene.isCreated && this.scene.create) {
                this.scene.isCreated = true;
                this.scene.create();
            }

            this.scene.loop();

            if (this.scene.update) {
                this.scene.update();
            }
        }
    }

    addImagesLoadListener() {
        for (const image of this.images.values()) {
            image.addEventListener("load", () => {
                this.imagesLoaded++;

                if (this.imagesLoaded == this.images.size) {
                    this.isAllImagesLoaded = true;
                }
            });
        }
    }

    loadImage(key, src) {
        const image = new Image();
        image.src = src;
        this.images.set(key, image);
    }

    setScene(scene) {
        if (this.scene) {
            this.scene.destroy();
        }

        this.scene = scene;

        if (this.scene.preload) {
            this.scene.preload();
        }
    }
}
