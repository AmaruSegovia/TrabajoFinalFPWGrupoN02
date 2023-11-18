import Phaser, { Scene } from "phaser";
import { useEffect, useState } from "react";
import Menu from './scenes/Menu.js';
import Tutorial from './scenes/Tutorial.js';
import GameOver from './scenes/GameOver.js';
import Nivel1 from './scenes/Nivel1.js';

export default function SpaceWarConfig(){
    const Escenas = [Menu,Tutorial, GameOver ,Nivel1];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);
    
    const [listo, setListo] = useState(false);
    useEffect(() =>{
        let config = {
            type: Phaser.AUTO,
            scale: {
                width: 800,
                height: 600,
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,  // centra horizontalmente
            },
            parent: "container",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {y: 0,},
                    debug: false
                },
            },
            scene: iniciarEscena()
        };
        
        let game = new Phaser.Game(config);
        game.events.on("LISTO", setListo)

        return() => {
            setListo(false);
            game.destroy(true);
        }

    }, [listo]);
    
}