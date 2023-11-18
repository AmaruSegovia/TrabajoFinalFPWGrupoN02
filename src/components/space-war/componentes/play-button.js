import Phaser from "phaser";

export default class play_botton{
    constructor(scene) {
      this.relatedScene = scene;
    }
    preload() {
      this.relatedScene.load.image('button', '/img/SpaceWar/BotonPlay.png');
    }

    create() {
        //hacer el boton interactivo
        this.startButton = this.relatedScene.add.image(400,300, 'button').setInteractive().setScale(0.5,0.5);
        //cuando el boton sea precionado pasar a Escena1
        this.startButton.on('pointerdown', () =>{
          this.relatedScene.scene.pause();
          this.relatedScene.sonido.detener_escena();
          this.relatedScene.scene.start('Tutorial');
        });
    }
}