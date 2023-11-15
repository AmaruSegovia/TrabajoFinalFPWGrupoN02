import React from 'react'

const ItemButton = (props) => {
    return (
        <button type="button" className='h-96 w-96'>
            <span className='text-2xl font-light'>
                {props.label}
            </span>
        </button>
    )
}

export default ItemButton
