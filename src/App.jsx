import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/sitio-home/Home.jsx"
import ProyectosReact from './components/ProyectosReact.jsx';
import ProyectosPhaser from './components/ProyectosPhaser.jsx';
import Nosotros from './components/sitio-nosotros/Nosotros.jsx';
import ListaNotas from './components/listaTarea/ListaNotas.jsx';
import Comparador from './components/comparador-precios/Comparador.jsx';
import JuegoAnimales from './components/juegoAnimales/Inicio.jsx';
import SpaceWarConfig from './components/space-war/Config.jsx';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navbar/> }>
                    <Route path="/" element={<Home/>} />
                    <Route path="/react" element={<ProyectosReact/>} />
                    <Route path="/phaser-js" element={<ProyectosPhaser/>} />
                    <Route path="/nosotros" element={<Nosotros/>} />
                    
                    <Route path="/react/comparador-precios" element={<Comparador/>} />
                    <Route path="/react/lista-de-notas" element={<ListaNotas/>} />
                    <Route path="/react/juegoAnimales" element={<JuegoAnimales/>} />
                    <Route path="/react/adivinar-animales" element={<ProyectosReact/>} />

                    <Route path="/phaser-js/dude" element={<ProyectosPhaser/>} />
                    <Route path="/phaser-js/juego-naves" element={<SpaceWarConfig/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
