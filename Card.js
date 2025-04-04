import Sprite from "./lib/Sprite.js";

export default class Card extends Sprite {
    constructor(game, x, y, width, height, image) {
        super(
            game,
            x,
            y,
            width,
            height,
            {
                image: "card-back",
                x: 0,
                y: 0,
                width: 240,
                height: 360
            }
        );

        this.image = image;
        this.isOpen = false;
        this.isClosing = false;
        this.closeCounter = 0;
        this.closeDuration = 30;

        let frames = [];

        for (let i = 0; i < 7; i++) {
            frames.push({
                image: "card-back",
                x: i * 240,
                y: 0,
                width: 240,
                height: 360,
                duration: 1
            });
        }

        for (let i = 7 - 1; i >= 0; i--) {
            frames.push({
                image,
                x: i * 240,
                y: 0,
                width: 240,
                height: 360,
                duration: 1
            });
        }

        this.animations.set("open", frames);
        this.animations.set("close", frames.toReversed());
    }

    onClick() {
        if (this.game.pendingCard === null) {
            this.game.pendingCard = this;
            this.open();

            for (const card of this.game.cards) {
                if (card.isClosing) {
                    card.isClosing = false;
                    card.closeCounter = 0;
                    card.close();
                    console.log(card);
                }
            }

        } else {
            if (this.image === this.game.pendingCard.image) {
                this.game.pendingCard = null;
                this.open();
            } else {
                this.game.pendingCard.closeLazy();
                this.game.pendingCard = null;
                this.open();
                this.closeLazy();
            }
        }
    }

    update() {
        super.update();

        this.isDisabled = this.isAnimating || this.isOpen;

        if (this.isClosing) {
            this.closeCounter++;
        }

        if (this.closeCounter >= this.closeDuration) {
            this.isClosing = false;
            this.closeCounter = 0;
            this.close();
        }
    }

    open() {
        this.isOpen = true;
        this.play("open");
    }

    close() {
        this.isOpen = false;
        this.play("close");
    }

    closeLazy() {
        this.isClosing = true;
    }
}
