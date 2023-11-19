import Phaser from 'phaser';

class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload() {
        // this.load.audio('cancion', '/sound/cancion.mp3')
        //Fondo
        this.load.image('background', '/img/Dude/FondoMenu.jpg');
        //Boton play
        this.load.image('button', '/img/Dude/BotonPlay.jpg');
    }
    create() {
        // Agregando Sonido
        // this.sonido = this.sound.add('cancion')
        // const soundConfig = {
        //     volume: 1,
        //     loop: true
        // }

        this.add.image(400,300, 'background');
        //hacer el boton interactivo
        this.startButton = this.add.image(400,300, 'button').setInteractive().setScale(0.5,0.5);
        //cuando el boton sea precionado pasar a Escena1
        this.startButton.on('pointerdown', () =>{
            this.scene.start('Tutorial');
        });

    }
}
export default Menu;