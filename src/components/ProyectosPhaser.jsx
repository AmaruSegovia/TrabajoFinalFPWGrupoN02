import React from 'react'
import ItemButtonSmall from './ItemButtonSmall';

const ProyectosPhaser = () => {
    return (
        <div>
            <div className="text-center p-6 m-6">
            <h1 className="font-bold text-5xl p-2">Nuestros proyectos en <span className="text-yellow-400 hover:text-yellow-300 transition-all ease-out ">PhaserJS</span></h1>
                <h3 className="text-xl p-2">Desarrollamos los siguientes juegos usando PhaserJS</h3>
                <h6 className="text-l p-2">Haga clic en algún cuadro para probar un juego</h6>
            </div>
            <div className="flex justify-items-center text-center px-64">
                <div className="transition-all ease-out basis-1/2 mx-24 my-4 rounded-lg border-2 border-slate-300 hover:border-yellow-400 shadow-2xl shadow-slate-300 hover:shadow-yellow-300 text-slate-500 hover:text-slate-800">
                    <ItemButtonSmall label="Dude"></ItemButtonSmall>
                </div>
                <div className="transition-all ease-out basis-1/2 mx-24 my-4 rounded-lg border-2 border-slate-300 hover:border-yellow-400 shadow-2xl shadow-slate-300 hover:shadow-yellow-300 text-slate-500 hover:text-slate-800">
                    <ItemButtonSmall label="Juego de Naves"></ItemButtonSmall>
                </div>
            </div>
        </div>
    )
}
export default ProyectosPhaser;