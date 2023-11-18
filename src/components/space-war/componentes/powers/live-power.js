import Phaser from "phaser";

import Power from './powers.js';
export default class LivePower extends Power{
  constructor(scene, money) {
    super( scene, money, 'green');
  }

  mover(){
    this.sprite.setVelocityX(Phaser.Math.Between(-250, -100));
  }

  obtenerPower() {
    console.log('sumando vida');
    this.relatedScene.scoreVidas.increment();
  }

}