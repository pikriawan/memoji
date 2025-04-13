import Memoji from "./Memoji.js";
import Loading from "./scenes/Loading.js";

const play = document.createElement("button");
play.textContent = "Mainkan Memoji";
document.body.append(play);

let game;

play.addEventListener("click", () => {
    if (game === undefined) {
        const width = Math.max(screen.width, screen.height);
        const height = Math.min(screen.width, screen.height);
        game = new Memoji(width, height);
        game.setScene(new Loading(game));
    }

    addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            game.resume();
            game.canvas.style.display = "block";
            screen.orientation.lock("landscape").catch(() => {});
        } else {
            game.pause();
            game.canvas.style.display = "none";
            screen.orientation.unlock();
        }
    });

    game.canvas.requestFullscreen();
});
