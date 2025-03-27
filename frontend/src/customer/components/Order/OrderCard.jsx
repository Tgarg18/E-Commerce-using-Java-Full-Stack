import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/account/order/${order?.id}`)} className='bg-white p-5 shadow-lg hover:shadow-2xl'>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={6}>
                    <div className='flex cursor-pointer'>
                        <img draggable={false} className='w-[5rem] h-[5rem] object-cover object-top' src={order?.orderItems[0]?.product?.imageUrl} alt="" />
                        <div className='ml-5 space-y-2'>
                            <p className=''>{order?.orderItems[0]?.product?.title}</p>
                            <p className='opacity-50 text-xs font-semibold'>Size: {order?.orderItems[0]?.size}</p>
                            <p className='opacity-50 text-xs font-semibold'>Color: {order?.orderItems[0]?.product?.color}</p>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <p>₹{order?.totalDiscountedPrice}</p>
                </Grid>
                
                <Grid item xs={2}>
                    <p className='opacity-50 font-semibold'>Order Status: {order?.orderStatus}</p>
                </Grid>

                <Grid item xs={4}>
                    {order?.orderStatus === "Delivered" && <div><p className='flex items-center'>
                        <AdjustIcon sx={{ width: "15px", height: "15px" }} className='text-green-600 mr-2 text-sm' />
                        <span>Delivered on December 10</span>

                    </p>
                        <p className='text-xs'>
                            Your Item Has Been Delivered
                        </p>
                    </div>}
                    {order?.orderStatus !== "Delivered" && <p>
                        <span>Expected Delivered on December 10</span>
                    </p>}
                </Grid>

            </Grid>
        </div>
    )
}

export default OrderCard