import React from 'react'
import ItemButtonSmall from './ItemButtonSmall';
/* import { Link } from 'react-router-dom'; */
import { Outlet, Link } from "react-router-dom";

const ProyectosReact = () => {
    return (
        <div>
            <div className="text-center p-6 m-6">
                <h1 className="font-bold text-5xl p-2">Nuestros proyectos en <span className="text-sky-500 hover:text-sky-400 transition-all ease-out ">React</span></h1>
                <h3 className="text-xl p-2">Hemos trabajado en los siguientes proyectos usando React</h3>
                <h6 className="text-l p-2">Haga clic en algún cuadro para acceder a una demo en vivo</h6>
            </div>
            <div className="flex justify-items-center text-center">
                <div className="transition-all ease-out basis-1/3 mx-24 my-4 rounded-lg border-2 border-slate-300 hover:border-sky-500 shadow-2xl shadow-slate-300 hover:shadow-sky-300 text-slate-500 hover:text-slate-800">
                    <Link to="comparador-precios">
                        <ItemButtonSmall label="Comparador de Precios"></ItemButtonSmall>
                    </Link>
                </div>
                <div className="transition-all ease-out basis-1/3 mx-24 my-4 rounded-lg border-2 border-slate-300 hover:border-sky-500 shadow-2xl shadow-slate-300 hover:shadow-sky-300 text-slate-500 hover:text-slate-800">
                    <Link to="lista-de-notas"><ItemButtonSmall label="Lista de Tareas Interactiva"></ItemButtonSmall></Link>
                </div>
                <div className="transition-all ease-out basis-1/3 mx-24 my-4 rounded-lg border-2 border-slate-300 hover:border-sky-500 shadow-2xl shadow-slate-300 hover:shadow-sky-300 text-slate-500 hover:text-slate-800">
                    <ItemButtonSmall label="Juego de Adivinar Animales (en inglés, 2 jugadores)"></ItemButtonSmall>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export default ProyectosReact;