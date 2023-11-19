import Phaser from 'phaser';

class YouWin extends Phaser.Scene {
    constructor() {
        super("YouWin");
    }

    preload() {
         // Precargando Sonidos
         this.load.audio('sonidoGanando', '/sound/Dude/confirmation_002.ogg');
         this.load.image('ganaste', '/img/Dude/ganaste.jpg');
         this.load.image('buttonReset', '/img/Dude/reset.jpg');
    }

    create() {
        // Agregando Sonido
        let sonidoPerdiendo = this.sound.add('sonidoGanando');
        sonidoPerdiendo.play();

        this.add.image(400, 300, 'ganaste');

        // Creando el botón de reset
        this.resetButton = this.add.image(400, 300, 'buttonReset').setInteractive();
        
        // Configurando el evento de clic para recargar la página
        this.resetButton.on('pointerdown', () => {
            window.location.reload();
        });
    }
}

export default YouWin;
