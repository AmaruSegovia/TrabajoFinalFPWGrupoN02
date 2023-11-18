import Phaser from "phaser";

export default class Proyectiles {
    constructor(scene) {
        this.relatedScene = scene;  // se refiere a la escena a la que pertenece el codigo
        this.proyectiles = this.relatedScene.physics.add.group();  // crea un grupo
    }
  
    colisiones() {
      // Gestionar superposición entre proyectiles y asteroides
      // Los ponemos overlap debido a que sino los enemigos se ven afectados por la fisica de los proyectiles
      this.relatedScene.physics.add.overlap(this.proyectiles, this.relatedScene.asteroid.getAsteroids(), (proyectil, asteroide) => this.colisionProyectilEnemigo(proyectil, asteroide, 10),null, this);
      this.relatedScene.physics.add.overlap(this.proyectiles, this.relatedScene.enemigos, (proyectil, enemigo) => this.colisionProyectilEnemigo(proyectil, enemigo, 15), null, this);
    }

    // El cuerpo se volvera en un 50% transparente
    transparencia(miSprite){
      miSprite.alpha = 0.5;
      // Configura un temporizador para restaurar la transparencia después de 1 segundo (ajusta según sea necesario)
      this.relatedScene.time.delayedCall(400, () => {
        // Restaura la transparencia al 100%
        miSprite.alpha = 1;
      }, [], this);
    }
    
    // Colision entre un proyectil y un enemigo(nave u asteroide)
    colisionProyectilEnemigo(proyectil, enemigo, puntos){
      proyectil.destroy();
      this.transparencia(enemigo);
      enemigo.vida -= this.relatedScene.dañoPlayer;
      if(enemigo.vida <= 0){
          this.relatedScene.scoreBoard.incrementPoints(puntos);
          this.relatedScene.add.sprite(enemigo.x, enemigo.y, 'explosion').play('explode').setScale(2);
          this.relatedScene.sonido.muerte_enemigo();
          enemigo.destroy();
      }
    }
    
    // Colocar el sonido segun el proyectil
    verificarSonidoDisparo(){
      if(this.relatedScene.proyectilScale != 1 && this.relatedScene.powerGroup[3] && this.relatedScene.powerGroup[3].powerMultipleActive){
          this.relatedScene.sonido.disparoCombo();
      }else if(this.relatedScene.proyectilScale != 1){
          this.relatedScene.sonido.disparoSuper();
      }else if( this.relatedScene.powerGroup[3] && this.relatedScene.powerGroup[3].powerMultipleActive){
          this.relatedScene.sonido.disparoMultiple();
      } else{
          this.relatedScene.sonido.disparo();
      }
    }

    // Crear proyectil
    crearProyectilSegunPower(){
      const proyectil = this.proyectiles.create(this.relatedScene.nave.getPosicionX(), this.relatedScene.nave.getPosicionY(), "proyectil");
      proyectil.setScale(this.relatedScene.proyectilScale);
      proyectil.setVelocityX(400);

      // Si el objeto existe y tiene activado el poder multiple
      if (this.relatedScene.powerGroup[3] && this.relatedScene.powerGroup[3].powerMultipleActive ) {
        proyectil.destroy();
        const factorDeAjuste = 80;
        for (let i = -3; i < 4; i+=3) {
          let proyectil = this.proyectiles.create(this.relatedScene.nave.getPosicionX(), this.relatedScene.nave.getPosicionY(), "proyectil");
          proyectil.setVelocityY(i* factorDeAjuste);
          proyectil.setVelocityX(800);
          proyectil.setScale(this.relatedScene.proyectilScale);
        }
        // cada 10s se reseteara el poder multiple
        this.relatedScene.time.delayedCall(10000, () => {
          this.relatedScene.powerGroup[3].resetMultiplePower()
        }, [], this);
      }
    }

    // Verifica si los proyectiles han salido de los límites del mapa y destrúyelos
    verificarLimitProyectiles(){
      this.proyectiles.getChildren().forEach(proyectil => {
        if (proyectil.x > 800 || proyectil.x < 0 || proyectil.y > 600 || proyectil.y < 0) {
            proyectil.destroy();
        }
      });
    }
}