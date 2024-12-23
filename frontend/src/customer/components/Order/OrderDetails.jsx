import React from 'react'
import AddressCard from '../AddessCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const OrderDetails = () => {
    return (
        <div className='ps-5 lg:px-20'>

            <div className=''>
                <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
                <AddressCard />
            </div>

            <div className='py-20'>
                <OrderTracker activeStep={3} />
            </div>

            <Grid container className='space-y-5'>
                {[1, 1, 1, 1, 1, 1].map((item, index) =>
                    <Grid key={index} item container className='shadow-xl rounded-md p-5 border' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Grid item xs={6}>
                            <div className='flex items-center space-x-4'>
                                <img className='w-[5rem] h-[5rem] object-cover object-top' draggable={false} src="https://rukminim1.flixcart.com/image/612/612/xif0q/jean/d/s/c/36-mj-bk-pl-48-comfits-original-imagqbrnyjfzhs8v.jpeg?q=70" alt="" />

                                <div className='space-y-2 ml-5'>
                                    <p className='font-semibold'>Men Slim Mid Rise Black Jeans</p>
                                    <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                        <span>Color: Black</span>
                                        <span>size: M</span>
                                    </p>
                                    <p className='opacity-90 text-sm'>Seller: Comfits</p>
                                    <p className='opacity-90 text-sm'>₹1099</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <Box sx={{ color: deepPurple[500], alignItems: 'center', display: 'flex' }}>
                                <StarBorderIcon sx={{ fontSize: '2rem' }} className='px-2' />
                                <span>Rate & Review Product</span>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Grid>

        </div>
    )
}

export default OrderDetails