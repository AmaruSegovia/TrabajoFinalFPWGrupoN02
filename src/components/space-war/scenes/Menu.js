import Phaser from "phaser";

import SoundScene from "../componentes/sound-scene.js";
import play_botton from "../componentes/play-button.js";
import Player from "../componentes/player.js";
import Asteroide from "../componentes/asteroid.js";
import Proyectiles from "../componentes/proyectiles.js";

class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu"});
    }
    //Carga cuando se reinicia o inicia la escena
    init(){
        // Se crean instancias a partir de ALGUNA clase
        this.buttonPlay = new play_botton(this);                    // Representa al boton de play
        this.sonido = new SoundScene(this);                         // Representa los sonidos de las escenas
        this.nave = new Player(this);                               // Representa la jugador
        this.asteroid = new Asteroide(this);                        // Representa el sprite del asteroide
        this.proyectiles = new Proyectiles(this);                   // Representa a los proyectiles del jugador
        this.velocidadEscenario = 1;    // Representa la velocidad que avanza el escenario
    }
    // Cargar recursos necesarios para el juego completo, antes de que comience la ejecución
    preload() {
        // Cargamos los audios y efectos
        this.sonido.preload();

        // Fondos
        this.load.image('fondoQuieto', '/img/SpaceWar/fondo02.png');
        this.load.image('fondoTutorial', '/img/SpaceWar/Sprite-0001.png');
        this.load.image("fondo", "/img/SpaceWar/fondito.jpg");
        this.load.image('Menu', '/img/SpaceWar/fondito.jpg');

        //Botones
        this.buttonPlay.preload();
        
        // Monedas
        this.load.spritesheet('money-red', '/img/SpaceWar/MonedaRed.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('money-green', '/img/SpaceWar/MonedaGreen.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('money-blue', '/img/SpaceWar/MonedaBlue.png', { frameWidth: 32, frameHeight: 32 });

        // Jugador
        this.nave.preload();
        
        // Proyectil Jugador
        this.load.image("proyectil", "/img/SpaceWar/shoot.png");
        
        // Enemigo
        this.load.image("enemigo", "/img/SpaceWar/enemy.png");
        // Asteroide
        this.asteroid.preload();

        // Proyectil Enemigo
        this.load.image("proyectilEnemigo", "/img/SpaceWar/shootEnemy.png");

        // Cargamos la fuente
        this.loadFont('dogicapixelbold', '/fonts/dogicapixel.ttf');
    }

    // Realizaría la configuración adicional y la lógica del juego.
    create() {
        // Agrega el fondo del menu
        this.fondo = this.add.tileSprite(0, 0, 800, 600, "fondo").setOrigin(0, 0);

        // Agrega Sonido y efectos
        this.sonido.create('Menu');
        
        // Animacion de explosion
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0, 
            hideOnComplete: true // desaparece una vez que finaliza la animacion
        });

        // Crea un grupo para enemigos
        this.enemigos = this.physics.add.group();

        // Configura un temporizador para crear enemigos
        this.time.addEvent({
            delay: 2000,
            callback: this.generarEnemigo,
            callbackScope: this,
            loop: true,
        });

        // Habilita la interacción con los enemigos
        this.input.on('pointerdown', (pointer) => {
            this.enemigos.getChildren().forEach(enemigo => {
                if (enemigo.getBounds().contains(pointer.x, pointer.y)) {
                    this.add.sprite(enemigo.x, enemigo.y, 'explosion').play('explode').setScale(2);
                    enemigo.destroy();
                }
            });
        });

        // Crea animaciones del personaje
        this.nave.create();
    }
    // Metodo que genera enemigos 
    generarEnemigo() {
        const x = 800;
        const y = Phaser.Math.Between(100, 500);
        const enemigo = this.enemigos.create(x, y, "enemigo");
        enemigo.setVelocityX(Phaser.Math.Between(-200, -100));
    }

    // Actualizacion continua
    update(){
        this.fondo.tilePositionX += this.velocidadEscenario;

        //Verifica que los enemigos salgan y se destruyan
        this.enemigos.getChildren().forEach(enemigo => {
            if (enemigo.x > 800 || enemigo.x < 0 || enemigo.y > 600 || enemigo.y < 0) {
                enemigo.destroy();
            }
        });
        
        // Agregando el boton
        this.buttonPlay.create();
    }
    // Funcion para cargar la fuente
    loadFont(name, url) {
        let newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}
export default Menu;