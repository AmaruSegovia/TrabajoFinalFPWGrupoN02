import React from 'react';

function Felicitaciones({ nombreJugador, puntaje }) {
    return (
        <div>
            <h1>Congratulations, {nombreJugador}!</h1>
            <p>Your total score: {puntaje}</p>
            {puntaje > 5 ? <p>Wow</p>:<p>Not bad!</p>}
        </div>
    );
}

export default Felicitaciones;
