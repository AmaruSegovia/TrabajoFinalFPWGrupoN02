import Phaser from "phaser";

export default class RestartButton{
    constructor(scene) {
        this.relatedScene = scene;  // se refiere a la escena a la que pertenece el codigo
    }
    preload() {
        this.relatedScene.load.spritesheet('restart', '/img/SpaceWar/restart-button.jpeg', { frameWidth: 256, frameHeight: 91 });
    }

    create() {
        this.button = this.relatedScene.add.sprite(400, 450, 'restart').setInteractive();
        // Cuando el cursor esté encima del botón
        this.button.on('pointerover', () => {
            this.button.setFrame(1);  // cambiar al 2do frame del spritesheet
        });
        // Cuando ya no esté encima
        this.button.on('pointerout', () => {
            this.button.setFrame(0);  // cambiar al 1er frame del spritesheet
        });
        // Cuando se detecte un clic
        this.button.on('pointerdown', () => {
            this.relatedScene.scene.start('Tutorial');  // cambiar de escena
        });
    }
    
}