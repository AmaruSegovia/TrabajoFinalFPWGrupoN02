import React from 'react'
import MemberCard from './MemberCard';


const Nosotros = () => {
    return (
        <div>
            <div className="text-center p-6 m-6">
                <h1 className="font-bold text-6xl p-2">Grupo 02</h1>
                <h3 className="font-semibold text-xl p-2">Conformado por:</h3>
                <div className="flex flex-wrap justify-center">
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                </div>
            </div>
        </div>
    )
}
export default Nosotros;