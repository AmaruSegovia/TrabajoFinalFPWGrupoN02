import React from 'react'

const ItemButtonSmall = (props) => {
    return (
        <button type="button" className='h-72 w-72 p-4'>
            <span className='text-xl font-light'>
                {props.label}
            </span>
        </button>
    )
}

export default ItemButtonSmall
