import Phaser from "phaser";

// Marcador de Vidas
export default class Life{
    constructor(scene,lifes){
        this.relatedScene = scene;
        this.lifes = lifes;
    }
    create () {
        // Configura el texto de las vidas
        this.vidaText = this.relatedScene.add.text(340, 15, "Lifes: "+ this.lifes, {
            fontSize: "25px",
            fill: "#fff",
            fontFamily: "dogicapixelbold"
        });
    }

    decrement(){
        this.lifes--;
        this.actualizarVida();
    }

    increment(){
        this.lifes++;
        this.actualizarVida();
    }

    actualizarVida(){
        this.vidaText.setText("Lifes: " + this.lifes)
    }

    getLifes(){
        return(this.lifes);
    }
}