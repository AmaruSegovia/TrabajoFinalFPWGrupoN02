import Phaser from "phaser";

export default class Ejemplo extends Phaser.Scene{
    constructor(){
        super({key: "Menu"});
    }
    //Carga cuando se reinicia o inicia la escena
    init(){
        // Se crean instancias a partir de ALGUNA clase
        this.velocidadEscenario = 1;    // Representa la velocidad que avanza el escenario
    }
    // Cargar recursos necesarios para el juego completo, antes de que comience la ejecución
    preload() {
        // Cargamos los audios y efectos

        // Fondos
        this.load.image('Menu', '/img/SpaceWar/img/fondito.jpg');

    }

    // Realizaría la configuración adicional y la lógica del juego.
    create() {
        // Agrega el fondo del menu
        this.fondo = this.add.tileSprite(0, 0, 800, 600, "Menu").setOrigin(0, 0);

        // Agrega Sonido y efectos
        

        // Crea animaciones del personaje
    }
    // Metodo que genera enemigos 
    
    // Actualizacion continua
    update(){
        this.fondo.tilePositionX += this.velocidadEscenario;

    }
}