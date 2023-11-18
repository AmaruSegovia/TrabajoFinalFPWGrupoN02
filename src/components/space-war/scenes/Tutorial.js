import Phaser from "phaser";

import ScoreBoard from "../componentes/scoreboard.js";
import FPS from "../componentes/fpsboard.js";
import SoundScene from "../componentes/sound-scene.js";
import Player from "../componentes/player.js";
import Text from "../componentes/textboard.js";
import Asteroide from "../componentes/asteroid.js";
import DestroyPower from "../componentes/powers/destroy-power.js";
import Proyectiles from "../componentes/proyectiles.js";
import Moneys from "../componentes/moneys.js";

export default class Tutorial extends Phaser.Scene{
    constructor(){
        super({key: "Tutorial"});
        this.maxpoints= 150;            // Cantidad de puntos necesarios para pasar a otro nivel
        this.velocidadEscenario = 1;    // Representa la velocidad que avanza el escenario
        this.puntaje = 0;               // Representa el puntaje del jugador
        this.dañoPlayer = 1;            // Representa el daño de la bala del jugador
        this.proyectilScale = 1;        // Representa la escala del proyectil
        this.lifes = 0                  // Representa la vida del jugador
        this.powerGroup = [];           // Almacen para los poderes que se podran usar
        this.ultimoDisparo = 0;         // Representa al tiempo desde el ultimo disparo
        this.retardoDisparo = 200;      // Representa al tiempo minimo para hacer un disparo
    }

    //Carga cuando se reinicia o inicia la escena
    init(){
        // Se crean instancias a partir de ALGUNA clase
        this.scoreBoard = new ScoreBoard(this, this.puntaje);       // Representa el marcador de puntos
        this.fps = new FPS(this);                                   // Representa el marcador de FPS
        this.sonido = new SoundScene(this);                         // Representa los sonidos de las escenas
        this.nave = new Player(this);                               // Representa la jugador
        this.text = new Text(this);                            // Representa al texto superior
        this.textDown = new Text(this);                            // Representa al texto superior
        this.textUp = new Text(this);                              // Representa al texto debajo
        this.asteroid = new Asteroide(this);                        // Representa el sprite del asteroide
        this.proyectiles = new Proyectiles(this);                   // Representa a los proyectiles del jugador
        
        this.moneys = new Moneys(this);                              // Representa a las Monedas que usamos para los PowerUps

        this.powerGroup[2] = new DestroyPower(this, this.moneys);   // Representa el Poder de aumentar el daño
    }

    // Realizaría la configuración adicional y la lógica del juego.
    create() {
        // Agregando Sonido
        this.sonido.create('tutorial');

        // Agregando Fondo
        this.add.image(0,0, 'fondoQuieto').setOrigin(0,0);
        this.fondo = this.add.tileSprite(0, 0, 800, 600, "fondoTutorial").setOrigin(0, 0);

        // Creando nave
        this.nave.crearNave();

        // Colocando texto en la parte baja
        this.text.create(`Get ${this.maxpoints} Points`, 250, 555, '25px' );
        this.textDown.create(`Damage: ${this.dañoPlayer}`, 20, 555, '25px' );

        // Colocando texto en la parte superior
        this.text.create(`TUTORIAL`, 310, 15, '25px');
        this.textUp.create(`Press ENTER to continue`, 210, 50, '20px');

        // Configura las teclas de movimiento
        this.cursors = this.input.keyboard.createCursorKeys();

        // Configura la tecla de espacio para disparar
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Configura la tecla de enter para saltar el tutorial
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Creando Marcador de puntos
        this.scoreBoard.create(0);

        // Creando marcador de FPS
        this.fps.create();

        // Gestionar superposición entre proyectiles y asteroide
        this.proyectiles.colisiones();

        // Configura un temporizador para alternar texto, solo afectara al ultimo texto
        this.time.addEvent({ 
            delay: 1000, 
            callback: ()=>{
                this.textUp.alternarTexto();
            }, 
            callbackScope: this, 
            loop: true 
        });

        // Configura un temporizador para crear objetos powers randoms
        this.time.addEvent({ 
            delay: 5000, 
            callback: this.createRandomPower, 
            callbackScope: this, 
            loop: true 
        });

        // Configura un temporizador para crear asteroides
        this.time.addEvent({
            delay: 2000,
            callback:  () => {
                this.asteroid.create();
            },
            callbackScope: this,
            loop: true,
        });
    }

    // Metodo para crear el poder
    createRandomPower(){
        // Creando objeto con poder 2: mayor daño
        this.powerGroup[2].create(800, Phaser.Math.Between(20, 580));
    }

    // Colision entre la nave y algun asteroide
    colisionNaveEnemigo(nave, asteroide) {
        asteroide.destroy();
        this.sonido.muerte_enemigo();
        this.add.sprite(nave.x, nave.y, 'explosion').play('explode').setScale(2);
        this.add.sprite(asteroide.x, asteroide.y, 'explosion').play('explode').setScale(2);
        this.nave.destruirNave();
        this.nave.crearNave();
        this.powerGroup[2].resetDamage();         // resetea el daño de disparo
    }

    // Actualizacion continua
    update(){
        // Mueve el fondo
        this.fondo.tilePositionX += this.velocidadEscenario;

        // Colisionar nave con grupoAsteroide
        this.physics.add.collider(this.nave.getObject(), this.asteroid.getAsteroids(), this.colisionNaveEnemigo, null, this);

        // Actualizando los FPS
        this.fps.obteniendo(Math.floor(this.game.loop.actualFps));
        // Acutalizando el daño del jugador en pantalla
        this.textDown.actualizar("Damage: ",this.dañoPlayer);

        // Verificar limites de:
        this.proyectiles.verificarLimitProyectiles();
        this.asteroid.verificarLimites();

        // Verifica tanto limite como colision de las monedas
        this.moneys.verificarMuerte();

        // Control en el disparo del jugador segun la tecla de espacio
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.nave.dispararProyectil(this.proyectiles);
        }

        // Verifica la puntuacion actual, para cambiar de escena
        if (this.scoreBoard.getPoints() >= this.maxpoints || Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.pause();
            this.sonido.detener_escena();
            this.scene.start('Nivel1',{puntos:this.scoreBoard.getPoints()},);
        }

        // Movimiento del jugador
        this.nave.actualizarPosicion(this.cursors,this);
    }

    // Cambiar Velocidad del escenario
    setVelocidadEscenario(velocidad){
        this.velocidadEscenario = velocidad;
    }
}