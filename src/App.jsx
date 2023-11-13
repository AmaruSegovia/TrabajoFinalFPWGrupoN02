import React from 'react'
import ItemButton from "./components/ItemButton.jsx";
import {Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Proyectos from "./components/Proyectos.jsx"
import Home from "./components/Home.jsx"
import Nosotros from './components/Nosotros.jsx';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navbar/> }>
                    <Route path="/" element={<Home/>} />
                    <Route path="Proyectos" element={<Proyectos/>} />
                    <Route path="Nosotros" element={<Nosotros/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
