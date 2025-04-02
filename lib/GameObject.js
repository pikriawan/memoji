export default class GameObject {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isDisabled = false;
    }

    update() {}

    draw() {}

    onClick(event) {}
}
