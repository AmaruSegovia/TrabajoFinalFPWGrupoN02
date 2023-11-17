import React, { useState, useEffect } from 'react';
import animales1 from '../../animales.json'
import './Estilo.css';

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual, rondasTotales, setRondasTotales, jugadorActual, setJugadorActual }) {
    // Estados del componente
    const [rondaAreglo, setRondaAreglo] = useState(1); // Ronda actual del juego
    const [animalObjetivo, setAnimalObjetivo] = useState(''); // Animal objetivo para adivinar
    const [opciones, setOpciones] = useState([]); // Opciones (botones) que se mostrarán
    const [esCorrecto, setEsCorrecto] = useState(null); // Estado de la respuesta (correcta, incorrecta)
    const [puedeHacerClic, setPuedeHacerClic] = useState(true); // Controla si se pueden hacer clic en los botones
    const [usoComodinJugador1, setUsoComodinJugador1] = useState(true); //Controla si el comodin del jugador1 fue usado
    const [usoComodinJugador2, setUsoComodinJugador2] = useState(true);//Controla si el comodin del jugador2 fue usado

    // Función para obtener un animal aleatorio de la lista
    const obtenerAnimalAleatorio = () => {
        const animales = animales1.animales; 
        const indiceAleatorio = Math.floor(Math.random() * animales.length);
        return animales[indiceAleatorio];
    };
    
    // Función para obtener opciones aleatorias (incluyendo el animal correcto)
    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];
        
        // Agrega opciones aleatorias hasta alcanzar un total de 3
        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }
        
        // Ordena las opciones de forma aleatoria
        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);
        
        // Actualiza el estado con las nuevas opciones y el animal objetivo
        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };
    
    // Función para usar el comodín
    const usarComodin = () => {
        if (jugadorActual === 1 && usoComodinJugador1) {
            setUsoComodinJugador1(false);
        } else if (jugadorActual === 2 && usoComodinJugador2) {
            setUsoComodinJugador2(false);
        }
        // Encuentra el índice del botón incorrecto
        const indiceBotonIncorrecto = opciones.findIndex(animal => animal !== animalObjetivo);
        
        // Copia el array de opciones y elimina el botón incorrecto
        const nuevasOpciones = [...opciones];
        nuevasOpciones.splice(indiceBotonIncorrecto, 1);
        
        // Actualiza el estado con las nuevas opciones y desactiva el uso del comodín
        setOpciones(nuevasOpciones);
        
    }

    // Función para verificar la respuesta del jugador
    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado === animalObjetivo) {
            setEsCorrecto(true);
            setPuntaje(puntaje + 1);
        } else {
            setEsCorrecto(false);
        }
        setPuedeHacerClic(false);
    };

    // Función para manejar el caso cuando el jugador es el primero
    const seUsaIf = () => {
        if (jugadorActual === 1) {
            setRondaActual(rondaActual + 1);
        }
    }

    // Función para avanzar a la siguiente ronda del juego
    const siguienteRonda = () => {
        if (rondaActual <= rondasTotales) {
            if (jugadorActual === 2) {
                setRondaAreglo(rondaAreglo + 1);
            }
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            obtenerOpcionesAleatorias();
            seUsaIf();
            setJugadorActual(jugadorActual === 1 ? 2 : 1);
        } else {
            // Si se supera el número total de rondas, se termina el juego
            alTerminar(puntaje);
        }
    }

    // Determina si las opciones deben estar deshabilitadas
    const opcionesDeshabilitadas = esCorrecto !== null;

    // Efecto para cargar las opciones al inicio del juego
    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    return (
        <div className="juego-container">
            <h1 className="juego-title">{nombreJugador}, Can you guess this animal?</h1>
            <p className="round-number">Round Number: {rondaAreglo}</p>
            <img src={`/img/JuegoAnimales/${animalObjetivo}.png`} alt={animalObjetivo} className="animal-image" />
            <div className="opciones-container">
                {opciones.map((animal) => (
                    <button
                        key={animal}
                        onClick={() => verificarRespuesta(animal)}
                        disabled={!puedeHacerClic || opcionesDeshabilitadas}
                        className="opcion-button"
                    >
                        {animal}
                    </button>
                ))}
            </div>
            {esCorrecto === true && <p className="correct-message">Correct!</p>}
            {esCorrecto === false && <p className="incorrect-message">Incorrect!</p>} 
            <button onClick={siguienteRonda} disabled={puedeHacerClic || !opcionesDeshabilitadas} className="next-button">Next question {"->"}</button>
            <br></br>
            {jugadorActual === 1 && usoComodinJugador1 ? <button onClick={usarComodin} className="next-button">Comodin</button>: null}
            {jugadorActual === 2 && usoComodinJugador2 ? <button onClick={usarComodin} className="next-button">Comodin</button>: null}
        </div>
    );
}

export default Juego;
