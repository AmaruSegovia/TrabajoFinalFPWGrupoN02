import React from 'react'
import MemberCard from './MemberCard';
import data from "../../grupo02Data.json"


const Nosotros = () => {
    return (
        <div>
            <div className="text-center p-6 m-6">
                <h1 className="font-bold text-6xl p-2">Grupo 02</h1>
                <h3 className="font-semibold text-xl p-2">Conformado por:</h3>
                <div className="flex flex-wrap justify-center">
                    {
                        data.map(integrante => (
                            <MemberCard key = { integrante.id }
                                imagen = { integrante.imagen }
                                apellido = { integrante.apellido }
                                nombre = { integrante.nombre }
                                dni = { integrante.dni }
                                lu = { integrante.lu }
                                github = { integrante.github }
                                usuarioGithub ={ integrante.usuarioGithub }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Nosotros;