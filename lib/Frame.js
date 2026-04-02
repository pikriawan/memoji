export default class Frame {
    constructor(imageKey, x, y, width, height, duration) {
        this.imageKey = imageKey;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        if (!duration) {
            duration = 1;
        }

        this.duration = duration;
    }
}
