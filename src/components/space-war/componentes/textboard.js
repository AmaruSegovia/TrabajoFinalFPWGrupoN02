import Phaser from "phaser";

// Texto
export default class Text{
    constructor(scene){
        this.relatedScene = scene;
    }
    create (text, x, y, size) {
        // Configura cualquier texto
        this.text = this.relatedScene.add.text(x, y, text, {
            fontSize: size,
            fill: '#fff',
            fontFamily: 'dogicapixelbold',
        });
    }

    // Actualiza el texto en Update
    actualizar(text, valorActualizable){
        this.text.setText(`${text}${valorActualizable}`);
    }

    // Cambia la visivilidad del texto
    alternarVisibilidad() {
        this.text.visible = !this.text.visible; // Cambia la visibilidad del texto
    }

    // Función para activar/desactivar el texto cada 0.5 segundos
    alternarTexto() {
        this.alternarVisibilidad();  // Activa/desactiva el texto inmediatamente
        // Luego, establece un temporizador para volver a activar/desactivar después de 0.5 segundos
        this.relatedScene.time.delayedCall(500, this.alternarVisibilidad, [], this);
    }
}