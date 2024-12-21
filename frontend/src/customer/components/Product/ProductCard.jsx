import React from 'react'
import './ProductCard.css'

const ProductCard = () => {
    return (
        <div className='productCard w-[15rem] m-3 transition-all cursor-pointer'>
            
            <div className='h-[20rem]'>
                <img className='h-full w-full object-cover object-center-top' draggable={false} src="https://rukminim1.flixcart.com/image/612/612/xif0q/t-shirt/1/d/2/s-3813-the-dry-state-original-imagcfh833gdjeem-bb.jpeg?q=70" alt="" />
            </div>

            <div className='textPart bg-white p-3'>
                <div>
                    <p className='font-bold opacity-60'>THE DRY STATE</p>
                    <p>Women Printed Round Neck Pure Cotton White T-Shirt</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <p className=' font-semibold'>₹399</p>
                    <p className='line-through opacity-50'>₹1399</p>
                    <p className='text-green-600 font-semibold'>70% off</p>
                </div>
            </div>

        </div>
    )
}

export default ProductCard