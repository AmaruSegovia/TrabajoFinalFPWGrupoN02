import Phaser from "phaser";

export default class Powers{
    constructor(scene, moneys, powerSprite) {
    this.relatedScene = scene;
    this.moneys = moneys;
    this.powerSprite = powerSprite;
  }

  create(x, y) {
    this.moneys.create(x, y, this.powerSprite, this);
  }

  obtenerPower() {
    console.log('Definir el poder');
  }

}