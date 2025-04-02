export default class GameObject {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.isDisabled = false;
    }

    onClick(event) {}

    update() {}

    draw() {}
}
