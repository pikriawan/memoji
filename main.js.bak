import MainGame from "./MainGame.js";

const play = document.createElement("button");
play.textContent = "Mainkan Memoji";
document.body.append(play);

let game;

play.addEventListener("click", () => {
    if (game === undefined) {
        const width = Math.max(screen.width, screen.height);
        const height = Math.min(screen.width, screen.height);
        game = new MainGame(width, height, 3, 8);
    }

    addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            game.resume();
            game.canvas.style.display = "block";
            screen.orientation.lock("landscape");
        } else {
            game.pause();
            game.canvas.style.display = "none";
            screen.orientation.unlock();
        }
    });

    game.canvas.requestFullscreen();
});
