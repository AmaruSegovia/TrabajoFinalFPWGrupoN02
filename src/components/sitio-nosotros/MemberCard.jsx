import React from 'react'

const MemberCard = (props) => {
    return (
        <div className='p-12 m-14 w-80 border-2 rounded-md hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200 transition-all ease-out'>
            <div className="w-full">
                <img className='mx-auto mb-8 rounded-lg shadow-xl' src={"./img/" + props.imagen} alt="Foto de perfil" />
            </div>
            <div className="mb-6">
                <h2 className='font-bold text-2xl'>{props.apellido}</h2>
                <h3 className='font-light text-lg'>{props.nombre}</h3>
            </div>
            <span>DNI: {props.dni}</span><br />
            <span>LU: {props.lu}</span><br />
            <span>GitHub: <a className='underline text-teal-500 hover:text-teal-400' href={"https://www.github.com/" + props.github} target="_blank" >{props.github}</a></span>
        </div>
    )
}

export default MemberCard
