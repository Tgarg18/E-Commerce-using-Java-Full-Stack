import React from 'react'

const AddressCard = ({ address }) => {
    return (
        <div>
            <div className='space-y-3'>
                <p className='font-semibold'>{address?.firstName + " " + address?.lastName}</p>
                <p>{address?.streetAddress + ", " + address?.city}</p>
                <p>{address?.state + ", " + address?.pinCode}</p>
                <div className='space-y-1'>
                    <span className='font-semibold'>Phone Number: </span>
                    <span>{address?.mobile}</span>
                </div>
            </div>
        </div>
    )
}

export default AddressCard