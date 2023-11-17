import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/sitio-home/Home.jsx"
import ProyectosReact from './components/ProyectosReact.jsx';
import ProyectosPhaser from './components/ProyectosPhaser.jsx';
import Nosotros from './components/sitio-nosotros/Nosotros.jsx';
import ListaNotas from './components/listaTarea/ListaNotas.jsx';
import ListaTareas from './components/listaTarea/ListaTareas.jsx';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navbar/> }>
                    <Route path="/" element={<Home/>} />
                    <Route path="/react" element={<ProyectosReact/>} />
                    <Route path="/phaser-js" element={<ProyectosPhaser/>} />
                    <Route path="/nosotros" element={<Nosotros/>} />
                    <Route path= "/listaNotas" element={<ListaNotas/>} />
                    <Route path= "/listaTareas" element={<ListaTareas/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
