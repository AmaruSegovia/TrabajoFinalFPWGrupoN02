import Phaser from "phaser";

export default class Asteroide{
    constructor(scene) {
        this.relatedScene = scene;
        this.asteroides = this.relatedScene.physics.add.group();
    }

    preload(){
        // Sprite
        this.relatedScene.load.spritesheet("asteroide", "/img/SpaceWar/asteroide.png", {
            frameWidth: 58,
            frameHeight: 62,
            startFrame:3
        });
    }

    create() {
        const x = 800;
        const y = Phaser.Math.Between(100, 500);
        const asteroide = this.asteroides.create(x, y, "asteroide");
        asteroide.setVelocityX(Phaser.Math.Between(-200, -100));
        asteroide.vida = 7;
    }

    // Verificar que los enemigos salgan y se destruyan
    verificarLimites(){
        this.asteroides.getChildren().forEach(asteroide => {
            asteroide.rotation -= 0.01;
            if (asteroide.x > 800 || asteroide.x < 0 || asteroide.y > 600 || asteroide.y < 0) {
                asteroide.destroy();
            }
        });
    }

    getAsteroids(){
        return this.asteroides;
    }
  
      
}