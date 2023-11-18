import Phaser from "phaser";

// Jugador
import Particle from "./particle.js";

export default class Player{
    constructor(scene){
        this.relatedScene = scene;
        this.particle1 = new Particle(this.relatedScene);
        this.particle2 = new Particle(this.relatedScene);
    }
    preload(){
        // carga el sprite de la nave
        this.relatedScene.load.spritesheet("nave", "/img/SpaceWar/nave.png", {
            frameWidth: 70,
            frameHeight: 62,
        });
        // carga el sprite de la explocion
        this.relatedScene.load.spritesheet("explosion","/img/SpaceWar/explosion.png", {
            frameWidth: 48,
            frameHeight: 48,
          }
        );
        // carga la img de las particulas
        this.relatedScene.load.image("particles", "/img/SpaceWar/orange.png");
    }
    create () {
        // Crea las animaciones del personaje
        this.relatedScene.anims.create({
            key: "up",
            frames: this.relatedScene.anims.generateFrameNumbers("nave", {
                start: 2,
                end: 2,
            }),
            frameRate: 10,
        });
        this.relatedScene.anims.create({
            key: "idle",
            frames: this.relatedScene.anims.generateFrameNumbers("nave", {
                start: 0,
                end: 0,
            }),
            frameRate: 10,
        });
        this.relatedScene.anims.create({
            key: "down",
            frames: this.relatedScene.anims.generateFrameNumbers("nave", {
                start: 1,
                end: 1,
            }),
            frameRate: 10,
        });
    }

    crearNave(){
        // Crea el personaje
        this.nave = this.relatedScene.physics.add.sprite(100, 300, "nave");
        this.nave.setCollideWorldBounds(true);
        // Crea las particulas de la nave
        this.particle1.create(10, this.nave);
        this.particle2.create(-10, this.nave);
    }

    destruirNave(){
        this.nave.destroy();
        this.particle1.destruir();
        this.particle2.destruir();
    }
    deshabilitar(){
        this.nave.disableBody(true,true);
        this.particle1.destruir();
        this.particle2.destruir();
    }

    dispararProyectil(proyectiles) {
        // obtener el tiempo actual en milisegundos
        const tiempoActual = this.relatedScene.time.now;
        // verificar si paso el tiempo minimo desde el ultimo disparo  Y  si la nave esta activa
        if (tiempoActual - this.relatedScene.ultimoDisparo > this.relatedScene.retardoDisparo && this.nave.active ){
            proyectiles.crearProyectilSegunPower();
            proyectiles.verificarSonidoDisparo();
            // actualiza el tiempo del ultimo disparo al tiempo actual
            this.relatedScene.ultimoDisparo = tiempoActual;
        }
    }

    velocidadX(x){
        this.nave.setVelocityX(x);
    }
    velocidadY(y){
        this.nave.setVelocityY(y);
    }

    animacion(nombre){
        this.nave.anims.play(nombre);
    }

    // Control en el movimiento de la nave en función de las teclas
    actualizarPosicion(cursors,scene){
        if(this.nave.active){  // Si la nave esta visible
            if (cursors.right.isDown) {
                this.velocidadX(200);
                scene.setVelocidadEscenario(3);
            } else if (cursors.left.isDown) {
                this.velocidadX(-200);
                scene.setVelocidadEscenario(0.5);
            } else {
                this.velocidadX(0);
                this.animacion("idle");
                scene.setVelocidadEscenario(1);
            }
    
            if (cursors.up.isDown) {
                this.velocidadY(-200);
                this.animacion("up");
            } else if (cursors.down.isDown) {
                this.velocidadY(200);
                this.animacion("down");
            } else {
                this.velocidadY(0);
                this.animacion("idle");
            }
        }
    }

    getObject(){
        return(this.nave);
    }

    getPosicionX(){
        return(this.nave.x)
    }
    getPosicionY(){
        return(this.nave.y);
    }
}