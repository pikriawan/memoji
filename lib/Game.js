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
        this.canvas.style.outline = "none";
        this.canvas.style.backgroundColor = "black";
        document.body.append(this.canvas);

        this.context = this.canvas.getContext("2d");
        this.context.scale(devicePixelRatio, devicePixelRatio);

        this.assets = new Map();
        this.assetsLoaded = 0;
        this.isAllAssetsLoaded = false;

        this.isPaused = false;

        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        this.startTime = null;
        this.currentTime = null;

        requestAnimationFrame(this.animate.bind(this));

        if (this.preload) {
            this.preload();
        }

        this.addAssetsLoadListener();
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
            if (this.isAllAssetsLoaded && !this.scene.isCreated && this.scene.create) {
                this.scene.isCreated = true;
                this.scene.create();
            }

            this.scene.loop();

            if (this.scene.update) {
                this.scene.update();
            }
        }
    }

    addAssetsLoadListener() {
        for (const asset of this.assets.values()) {
            let event = "";

            if (asset instanceof Image) {
                event = "load";
            } else if (asset instanceof Audio) {
                event = "canplaythrough";
            }

            asset.addEventListener(event, () => {
                this.assetsLoaded++;

                if (this.assetsLoaded == this.assets.size) {
                    this.isAllAssetsLoaded = true;
                }
            });
        }
    }

    resume() {
        this.isPaused = false;
        requestAnimationFrame(this.animate.bind(this));
    }

    pause() {
        this.isPaused = true;
    }

    loadImage(key, src) {
        const image = new Image();
        image.src = src;
        this.assets.set(key, image);
    }

    loadSound(key, src) {
        const sound = new Audio(src);
        this.assets.set(key, sound);
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

    playSound(soundKey) {
        let sound = this.assets.get(soundKey);

        if (sound instanceof Audio) {
            sound = new Audio(sound.src);
            sound.play();
        }
    }
}
