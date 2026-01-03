import Frame from "../lib/Frame.js";
import Sprite from "../lib/Sprite.js";

export default class Card extends Sprite {
    constructor(scene, imageKey, x, y, width, height) {
        super(scene, new Frame("card-back", 0, 0, 240, 360), x, y, width, height);

        this.imageKey = imageKey;
        this.isOpen = false;
        this.isForceDisabled = false;
        this.isDisabled = false;
        this.isClosing = false;
        this.closeDelay = 60;
        this.closeCounter = 0;

        const frames = [];

        for (let i = 0; i < 7; i++) {
            frames.push(new Frame("card-back", i * 240, 0, 240, 360));
        }

        for (let i = 7; i > 0; i--) {
            frames.push(new Frame(this.imageKey, (i - 1) * 240, 0, 240, 360));
        }

        this.animations.set("open", frames);
        this.animations.set("close", frames.toReversed());

        this.on("click", () => {
            if (!this.isDisabled) {
                this.onClick();
            }
        });
    }

    update() {
        super.update();
        
        if (this.isForceDisabled) {
            this.isDisabled = true;
        } else {
            this.isDisabled = this.isAnimating || this.isOpen;
        }
        
        if (this.isClosing) {
            this.closeCounter++;
        }
        
        if (this.closeCounter >= this.closeDelay) {
            this.isClosing = false;
            this.closeCounter = 0;
            this.close();
        }
        
        if (!this.isAnimating && this.willClose) {
            this.willClose = false;
            this.close();
        }
    }

    disable() {
        this.isForceDisabled = true;
    }

    open() {
        this.isOpen = true;
        this.play("open");
        this.scene.game.playSound("flip");
    }

    close() {
        this.isOpen = false;
        this.play("close");
    }

    closeLazy() {
        this.isClosing = true;
    }

    onClick() {
        if (this.scene.pendingCard == null) {
            this.scene.pendingCard = this;
            this.open();

            for (let i = 0; i < this.scene.cards.length; i++) {
                if (this.scene.cards[i].isClosing) {
                    this.scene.cards[i].isClosing = false;
                    this.scene.cards[i].closeCounter = 0;
                    this.scene.cards[i].willClose = true;
                }
            }
        } else {
            this.scene.decreaseMove();

            if (this.imageKey === this.scene.pendingCard.imageKey) {
                this.scene.pendingCard = null;
                this.open();
                this.scene.updateStatus();
            } else {
                this.scene.pendingCard.closeLazy();
                this.scene.pendingCard = null;
                this.open();
                this.closeLazy();
                this.scene.updateStatus();
            }
        }
    }
}
