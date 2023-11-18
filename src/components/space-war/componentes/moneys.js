import Phaser from "phaser";

export default class Moneys {
    constructor(scene) {
      this.relatedScene = scene;
      this.moneys = this.relatedScene.physics.add.group();
    }

    create(x, y, animacion, relatedPower) {
      let animationKey = 'money-' + animacion; 
      // Si la animacion no esiste, crearla 
      if(!this.relatedScene.anims.exists(animationKey)){
        // Configura la animación de giro
        this.relatedScene.anims.create({
          key: animationKey,
          frames: this.relatedScene.anims.generateFrameNumbers(animationKey, { start: 0, end: 4 }),
          frameRate: 8,  // Ajusta la velocidad
          repeat: -1     // -1: animación indefinidamente
        });
      }

      this.relatedScene.physics.add.collider(this.relatedScene.nave.getObject(), this.moneys, this.ballImpact, null, this);
      let money = this.moneys.create(x, y, animationKey)
      money.anims.play(animationKey);
      money.setScale(1.2);
      money.relatedPower = relatedPower;
      money.setVelocity(Phaser.Math.Between(-200, -100), Phaser.Math.Between(-50, 50));
    }

    //Verifica que las monedas salgan y se destruyan
    verificarMuerte(){
      this.moneys.getChildren().forEach(money => {
        if (money.x > 800 || money.x < 0 || money.y > 600 || money.y < 0) {
          money.destroy();
        }
      });
    }

    // Colision entre la nave y moneda
    ballImpact(nave, money) {
      this.relatedScene.sonido.money_collected();
      money.destroy();
      money.relatedPower.obtenerPower();
    }
}