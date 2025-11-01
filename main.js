import Memoji from "./Memoji.js";
import Loading from "./scenes/Loading.js";

const game = new Memoji(innerWidth, innerHeight);
game.setScene(new Loading(game));
