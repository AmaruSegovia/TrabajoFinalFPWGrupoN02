import Phaser from "phaser";

// Particulas de la nave
export default class Particle{
    constructor(scene){
        this.relatedScene = scene;
    }

    create (y, nave) {
        // Partícula del primer motor de la nave
        this.particle = this.relatedScene.add.particles(-20, y, 'particles', {
            speed: 150,
            quantity: 20,
            angle: {
                min: 170,
                max: 190,
            },
            scale: { start: 0.6, end: 0 },
            blendMode: "ADD",
        });
        this.particle.startFollow(nave);
        
    }

    destruir(){
        this.particle.destroy();
    }
}