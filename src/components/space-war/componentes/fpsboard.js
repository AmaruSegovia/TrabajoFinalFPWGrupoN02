import Phaser from "phaser";

// Marcador de FPS
export default class FPS{
    constructor(scene){
        this.relatedScene = scene;
    }
    create () {
        // Configura el texto de los FPS
        this.mostrarFPS = this.relatedScene.add.text(640, 15, 'FPS: 0', {
            fontSize: '25px',
            fill: '#fff',
            fontFamily: 'dogicapixelbold'
        });
    }
    obteniendo(Caso){
        this.mostrarFPS.setText(`FPS: ${Caso}`);
    }
}