import React from 'react'
import NavButton from './NavButton'

const Navbar = () => {
    return (
        <nav className="flex-row shadow-xl shadow-gray-100 sticky top-0">
            <div className='m-3 font-bold text-3xl mr-4 text-sky-900'>Grupo 02</div>

            <div className='justify-items-center'>
                <NavButton label="Proyectos React"></NavButton>
                <NavButton label="Proyectos PhaserJS"></NavButton>
                <NavButton label="Sobre Nosotros"></NavButton></div>    
        </nav>

    )
}

export default Navbar
