export default class GameObject {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.isDisabled = false;
    }
}
