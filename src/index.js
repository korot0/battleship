import "./reset.css";
import "./styles.css";

import { GameController } from "./gameController.js";

const game = GameController();
game.placeDummyShips();
game.start();
