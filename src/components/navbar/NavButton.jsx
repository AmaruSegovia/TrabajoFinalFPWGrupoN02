import React from 'react'

const NavButton = (props) => {
    return (
        <button type="button" className='transition-all ease-in-out p-4 justify-center border-2 border-white hover:border-b-slate-700 hover:border-t-slate-100 hover:bg-slate-100 cursor-pointer'>
            {props.label}
        </button>
    )
}

export default NavButton
