import Phaser from "phaser";
import { useEffect, useState } from "react";
import Menu from './escenas/Menu.js';
import Tutorial from './escenas/Tutorial.js';
import GameOver from './escenas/GameOver.js';
import Escena1 from './escenas/Escena1.js';
import Escena2 from './escenas/Escena2.js';
import Escena3 from './escenas/Escena3.js';
import YouWin from './escenas/YouWin.js';
import NextLevel from './escenas/NextLevel.js';

function Dude() {
    
    const Escenas = [Menu, Escena1, Escena2, Escena3, GameOver, NextLevel, Tutorial, YouWin];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);
    
    const [listo, setListo] = useState(false);
    
    useEffect(() =>{
        let config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y:300},
                    debug: false
                }
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

export default Dude;

