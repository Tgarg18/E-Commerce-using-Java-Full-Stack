import React, { useEffect } from 'react'
import AddressCard from '../AddessCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Button, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const OrderDetails = () => {

    const { orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order } = useSelector(store => store);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId]);

    const orderStatus = {
        PLACED: 1,
        CONFIRMED: 2,
        SHIPPED: 4,
        DELIVERED: 5,
        CANCELLED: 0
    }

    return (
        <div className='ps-5 lg:px-20'>
            <Button
                color='secondary' variant='contained' sx={{ px: '2', py: '1', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" } }}
                onClick={() => navigate(-1)}
            >
                <ArrowBackIosIcon fontSize="small" />
                Back
            </Button>

            <div className=''>
                <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
                <AddressCard address={order?.order?.shippingAddress} />
            </div>

            <div className='py-20'>
                {orderStatus[order?.order?.orderStatus] === 0 && <h1 className='font-bold text-xl'>Order Cancelled</h1>}
                {orderStatus[order?.order?.orderStatus] !== 0 && <OrderTracker activeStep={orderStatus[order?.order?.orderStatus]} />}
            </div>

            <Grid container className='space-y-5'>
                {order?.order?.orderItems?.map((item, index) =>
                    <Grid key={index} item container className='shadow-xl rounded-md p-5 border' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Grid item xs={6}>
                            <div className='flex items-center space-x-4'>
                                <img className='w-[5rem] h-[5rem] object-cover object-top' draggable={false} src={item?.product?.imageUrl} alt="" />

                                <div className='space-y-2 ml-5'>
                                    <p className='font-semibold'>{item?.product?.title}</p>
                                    <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                        <span>Color: {item?.product?.color}</span>
                                        <span>Size: {item?.size}</span>
                                        <span>Quantity: {item?.quantity}</span>
                                    </p>
                                    <div className='space-x-2'>
                                        <span className='font-semibold'>₹{item?.discountedPrice}</span>
                                        <span className='line-through opacity-50'>₹{item?.price}</span>
                                        <span className='text-green-600 font-semibold'>{(item?.price - item?.discountedPrice) / 100}% off</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={2} onClick={() => { navigate(`/product/${item?.product?.id}`) }} className='cursor-pointer hover:underline'>
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