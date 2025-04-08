import Memoji from "./Memoji";
import Loading from "./scenes/Loading";

document.documentElement.style.width = "100%";
document.documentElement.style.height = "100%";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";

const game = new Memoji(600, 400);
game.setScene(new Loading(game));
