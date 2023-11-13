import React from 'react'

const MemberCard = () => {
    return (
        <div className='p-12 m-14 w-80 border'>
            <div className="w-full">
                <img src="./default-profile.png" alt="Foto de perfil" />
            </div>
            <div className="mb-6">
                <h2 className='font-bold text-2xl'>Apellido</h2>
                <h3 className='font-light text-lg'>Nombre</h3>
            </div>
            <span>DNI: 12345678</span><br />
            <span>LU: 9999</span><br />
            <span>GitHub: <a className='underline text-teal-500 hover:text-teal-400' href="http://www.google.com">link</a></span>
        </div>
    )
}

export default MemberCard
