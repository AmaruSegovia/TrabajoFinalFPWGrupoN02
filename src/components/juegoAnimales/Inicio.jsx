import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function Inicio() {
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
    const [nombreJugador1, setNombreJugador1] = useState('');
    const [nombreJugador2, setNombreJugador2] = useState('');
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [puntajeJugador1, setPuntajeJugador1] = useState(0);
    const [puntajeJugador2, setPuntajeJugador2] = useState(0);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);
    const [jugadorActual, setJugadorActual] = useState(1);

    const manejarClickJugar = () => {
        setMostrarJuego(true);
    };

    const alTerminar = (puntaje) => {
        if (jugadorActual === 1) {
            setPuntajeJugador1(puntaje);
        } else {
            setPuntajeJugador2(puntaje);
        }
        setMostrarFelicitaciones(true);
    };

    return (
        <div className="inicio-container">
            {mostrarJuego ? (
                <Juego
                    nombreJugador={jugadorActual === 1 ? nombreJugador1 : nombreJugador2}
                    puntaje={jugadorActual === 1 ? puntajeJugador1 : puntajeJugador2}
                    setPuntaje={jugadorActual === 1 ? setPuntajeJugador1 : setPuntajeJugador2}
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}
                    rondasTotales={rondasTotales}
                    setRondasTotales={setRondasTotales}
                    jugadorActual={jugadorActual}
                    setJugadorActual={setJugadorActual}
                />
            ) : (
                <div className="inicio-form">
                    <h1>Player 1, enter your name</h1>
                    <input
                        type="text"
                        placeholder="Your name here"
                        onChange={(e) => setNombreJugador1(e.target.value)}
                    />
                    <h1>Player 2, enter your name</h1>
                    <input
                        type="text"
                        placeholder="Your name here"
                        onChange={(e) => setNombreJugador2(e.target.value)}
                    />
                    <button className="jugar-button" onClick={manejarClickJugar}>
                        Play
                    </button>
                </div>
            )}
            {mostrarFelicitaciones && (
                <div className="felicitaciones-container">
                    <div className='felicitacion'>
                    <Felicitaciones nombreJugador={nombreJugador1} puntaje={puntajeJugador1} jugador="1" />
                    <Felicitaciones nombreJugador={nombreJugador2} puntaje={puntajeJugador2} jugador="2" />
                    </div>
                    <div className='resultadoTotal'>
                    {puntajeJugador1 === puntajeJugador2 ? <p>Tie</p>: puntajeJugador1 > puntajeJugador2 ? <p>Win {nombreJugador1}</p> : <p>Win {nombreJugador2}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inicio;
