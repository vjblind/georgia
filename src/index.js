import Phaser from "phaser";

import bootScene from "./scenes/Scene1.js";
import Scene2 from "./scenes/Scene2.js";
import menu from "./scenes/MenuScene.js";
import end from "./scenes/endScene.js";
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 200
      }
    }
  },
  scene: [Scene2, bootScene, menu, end]
};
var game = new Phaser.Game(config);
