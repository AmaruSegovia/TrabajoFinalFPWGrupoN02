import Phaser from "phaser";

import Power from './powers.js';
export default class DestroyPower extends Power{
  constructor(scene, money) {
    super( scene, money, 'red');
    this.aumentoDaño = 2;
  }
  
  mover(){
    this.sprite.setVelocityX(Phaser.Math.Between(-250, -100));
  }

  obtenerPower() {
    this.increaseDamage();
    
  }

  // Aumenta el daño del jugador
  increaseDamage(){
      this.relatedScene.dañoPlayer += this.aumentoDaño;
      this.relatedScene.proyectilScale = 2;
      // Resetea cada 10s el poder de aumentar daño
      this.relatedScene.time.delayedCall(10000, () => {
        this.restDamage()
      }, [], this);
  }
  // Restar Daño del jugador
  restDamage(){
      if(this.relatedScene.dañoPlayer >1){
          this.relatedScene.dañoPlayer -= this.aumentoDaño;
      }
      if (this.relatedScene.dañoPlayer <= 1) {
          this.resetDamage();
      }
  }
  
  // Resetea El daño del jugador
  resetDamage(){
    this.relatedScene.proyectilScale = 1;
    this.relatedScene.dañoPlayer = 1;
  }
}