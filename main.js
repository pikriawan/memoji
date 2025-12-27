import Memoji from "./Memoji.js";
import Loading from "./scenes/Loading.js";

// const game = new Memoji(innerWidth, innerHeight);
// game.setScene(new Loading(game));

const startButton = document.createElement("button");
startButton.style.position = "absolute";
startButton.style.top = "50%";
startButton.style.left = "50%";
startButton.style.transform = "translate(-50%, -50%)";
startButton.textContent = "Mulai permainan";
document.body.append(startButton);

let game = null;

startButton.addEventListener("click", () => {
    if (game === null) {
        game = new Memoji(screen.width, screen.height);
        game.setScene(new Loading(game));
    }

    game.canvas.requestFullscreen();
});

window.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement && document.fullscreenElement === game.canvas) {
        game.canvas.style.display = "block";

        if (game.isPaused) {
            game.resume();
        }
    } else {
        game.canvas.style.display = "none";
        game.pause();


        startButton.textContent = "Lanjutkan permainan";
    }
});
