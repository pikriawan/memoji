import Card from "../game-objects/Card";
import MoveCounter from "../game-objects/MoveCounter";
import Frame from "../lib/Frame";
import Picture from "../lib/Picture";
import Scene from "../lib/Scene";
import Lose from "./Lose";
import Menu from "./Menu";
import Win from "./Win";

export default class Main extends Scene {
    static DIFFICULTY_EASY = 0;
    static DIFFICULTY_MEDIUM = 1;
    static DIFFICULTY_HARD = 2;
    static STATUS_PENDING = 0;
    static STATUS_LOSE = 1;
    static STATUS_WIN = 2;

    constructor(game, difficulty) {
        super(game);

        this.difficulty = difficulty;
        this.cardWidth = 60;
        this.cardHeight = 90;
        this.redirectDelay = 60;
        this.redirectCounter = 0;
        this.isRedirecting = false;
        this.status = Main.STATUS_PENDING;
        this.row = null;
        this.column = null;
        this.move = null;
        this.cards = [];
        this.pendingCard = null;
        this.moveCounter = null;
        this.totalCards = 30;
    }

    create() {
        switch (this.difficulty) {
            case Main.DIFFICULTY_EASY:
                this.row = 2;
                this.column = 4;
                this.move = 16;
                break;
            case Main.DIFFICULTY_MEDIUM:
                this.row = 2;
                this.column = 5;
                this.move = 20;
                break;
            case Main.DIFFICULTY_HARD:
                this.row = 3;
                this.column = 8;
                this.move = 48;
                break;
        }

        const background = new Picture(
            this,
            new Frame("background", 0, 0, 2751, 1236),
            0,
            0,
            this.game.width,
            this.game.height
        );
        this.addObject(background);

        const moveCounterGapY = 32;
        const cardGap = 8;

        this.moveCounter = new MoveCounter(this, this.move, null, null);
        this.cards = this.generateRandomCards();

        const totalCardWidth = this.column * this.cardWidth + (this.column - 1) * cardGap;
        const paddingCardX = (this.game.width - totalCardWidth) * 0.5;
        const totalCardHeight = this.row * this.cardHeight + (this.row - 1) * cardGap;
        const totalHeight = this.moveCounter.height + moveCounterGapY + totalCardHeight;
        const paddingY = (this.game.height - totalHeight) * 0.5;
        let lastY = paddingY;

        this.moveCounter.x = (this.game.width - this.moveCounter.width) * 0.5;
        this.moveCounter.y = lastY;
        this.addObject(this.moveCounter);
        lastY += this.moveCounter.height + moveCounterGapY;

        let i = 0;

        for (let j = 0; j < this.column; j++) {
            for (let k = 0; k < this.row; k++) {
                this.cards[i].x = paddingCardX + j * this.cardWidth + j * cardGap;
                this.cards[i].y = lastY + k * this.cardHeight + k * cardGap;
                this.addObject(this.cards[i]);
                i++;
            }
        }
    }

    update() {
        if (this.isRedirecting) {
            this.redirectCounter++;
        }
        
        if (this.redirectCounter === this.redirectDelay) {
            if (this.status == Main.STATUS_LOSE) {
                this.game.playSound("lose");
                this.game.setScene(new Lose(this.game));
            } else {
                this.game.playSound("win");
                this.game.setScene(new Win(this.game));
            }
        }
    }

    decreaseMove() {
        this.move--;
        this.moveCounter.decrease();
    }

    shuffle(array) {
        const result = array.slice();

        for (let i = 0; i < result.length; i++) {
            const random = Math.floor(Math.random() * result.length);
            const temp = result[i];
            result[i] = result[random];
            result[random] = temp;
        }

        return result;
    }

    duplicate(array) {
        return array.concat(array);
    }

    generateRandomCardsIndex() {
        const cardsCount = this.row * this.column * 0.5;
        let indexes = [];

        for (let i = 0; i < this.totalCards; i++) {
            indexes[i] = i + 1;
        }
        
        indexes = this.shuffle(indexes);
        return indexes.slice(0, cardsCount);
    }

    generateRandomCards() {
        let indexes = this.duplicate(this.generateRandomCardsIndex());
        indexes = this.shuffle(indexes);
        const cards = [];
        
        for (let i = 0; i < indexes.length; i++) {
            cards[i] = new Card(
                this,
                "card-" + indexes[i],
                null,
                null,
                this.cardWidth,
                this.cardHeight
            );
        }

        return cards;
    }

    checkStatus() {
        let allOpen = true;
        
        for (const card of this.cards) {
            if (!card.isOpen) {
                allOpen = false;
            }
        }
        
        if (allOpen) {
            return Main.STATUS_WIN;
        }
        
        if (this.move == 0) {
            return Main.STATUS_LOSE;
        }
        
        return Main.STATUS_PENDING;
    }

    updateStatus() {
        this.status = this.checkStatus();
        
        if (this.status != Main.STATUS_PENDING) {
            this.redirect();
            
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].disable();
                
                if (this.cards[i].isClosing) {
                    this.cards[i].isClosing = false;
                    this.cards[i].closeCounter = 0;
                    this.cards[i].willClose = false;
                }
            }
        }
    }

    redirect() {
        this.isRedirecting = true;
    }
}
