import React from 'react'
import ItemButton from './ItemButton';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="text-center p-6 m-6">
                <h1 className="font-bold text-6xl p-2">Bienvenido</h1>
                <h3 className="font-semibold text-xl p-2">Estos son los proyectos en los que hemos trabajado</h3>
            </div>
            <div className="flex justify-items-center text-center">
                <div className="transition-all ease-out basis-1/2 mx-36 my-4 rounded-lg border-2 border-slate-300 hover:border-sky-500 shadow-2xl shadow-slate-300 hover:shadow-sky-300 text-slate-500 hover:text-slate-800">
                    <Link to="/react">
                        <ItemButton label="Proyectos en React"></ItemButton>
                    </Link>
                </div>

                <div className="transition-all ease-out basis-1/2 mx-36 my-4 rounded-lg border-2 border-slate-300 hover:border-yellow-400 shadow-2xl shadow-slate-300 hover:shadow-yellow-300 text-slate-500 hover:text-slate-800">
                    <Link to="/phaser-js">
                        <ItemButton label="Proyectos en PhaserJS"></ItemButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Home;


