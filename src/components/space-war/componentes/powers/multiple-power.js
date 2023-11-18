import Phaser from "phaser";

import Power from "./powers.js";
export default class MultiplePower extends Power {
  constructor(scene, money) {
    super(scene, money, "blue");
    this.powerMultipleActive = false;
  }

  mover() {
    this.sprite.setVelocityX(Phaser.Math.Between(-250, -100));
  }

  obtenerPower() {
    console.log("Se obtuvo el power up");
    this.powerMultipleActive = true;
  }

  // Resetea El power del jugador
  resetMultiplePower(){
    this.powerMultipleActive = false;
  }
}
