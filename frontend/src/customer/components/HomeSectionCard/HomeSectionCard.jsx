import React from 'react'

const HomeSectionCard = ({product}) => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3'>

      <div className='h-[13rem] w-[10rem] mx-3'>
        <img draggable={false} className='object-cover object-top w-full h-full' src={product.imageUrl} alt="" />
      </div>

      <div className='p-4 mx-3'>
        <h3 className='text-lg font-medium text-gray-900'>{product.brand}</h3>
        <p className='mt-2 text-sm textgray-500 pr-3'>{product.title}</p>
      </div>
    </div>
  )
}

export default HomeSectionCard