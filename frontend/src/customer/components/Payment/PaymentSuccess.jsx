import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { updatePayment } from '../../../State/Payment/Action';
import { Alert, AlertTitle, Grid } from '@mui/material';
import OrderTracker from '../Order/OrderTracker';
import AddressCard from '../AddessCard/AddressCard';

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const { orderId } = useParams();

    const dispatch = useDispatch();
    const { order } = useSelector(store => store);

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);

        setPaymentId(urlParam.get('razorpay_payment_id'));
        setPaymentStatus(urlParam.get('razorpay_payment_link_status'));
    }, []);

    useEffect(() => {
        if (paymentId) {
            const data = {
                orderId,
                paymentId,
            }
            dispatch(getOrderById(orderId));
            dispatch(updatePayment(data));
        }

    }, [orderId, paymentId]);

    return (

        <div className='px-2 lg:px-36'>
            <div className='flex flex-col justify-center items-center'>
                <Alert variant='filled' severity='success' sx={{ mb: 6, width: "fit-content" }}>
                    <AlertTitle>
                        Payment Success
                    </AlertTitle>
                    Your payment has been successful. Your order has been placed.
                </Alert>
            </div>
            <OrderTracker activeStep={1} />

            <div className='pt-10'>
                <h2 className='text-xl font-extrabold text-gray-800'>Order Details</h2>
                <div className='p-5 shadow-xl'>
                    <AddressCard address={order.order?.shippingAddress} />
                </div>
            </div>

            <Grid container className='space-y-5 py-5 pt-10'>

                {order.order?.orderItems?.map((item, index) =>
                    <Grid container item className='shadow-xl rounded-md p-5' sx={{ alignItems: 'center', justifyContent: 'space-between' }} key={index}>
                        <Grid item xs={6}>
                            <div className='flex items-center'>
                                <img src={item?.product?.imageUrl} alt="product Image" draggable={false} className='w-[5rem] h-[5rem] object-cover object-top' />

                                <div className='ml-5 space-y-2'>
                                    <p>{item?.product?.title}</p>
                                    <div className='opacity-50 text-xs font-semibold space-x-5'>
                                        <span>Color: {item?.product?.color}</span>
                                        <span>Size: {item?.size}</span>
                                    </div>
                                    <p className=''>Seller: {item?.product?.brand}</p>
                                    <div className='flex space-x-3 items-center text-gray-900 pt-6'>
                                        <p className='font-semibold'>₹{item?.product?.discountedPrice}</p>
                                        <p className='line-through opacity-50'>₹{item?.product?.price}</p>
                                        <p className='text-green-600 font-semibold'>{item?.product?.discountPercent}% off</p>
                                    </div>
                                </div>

                            </div>
                        </Grid>
                    </Grid>)
                }

            </Grid>
        </div>
    )
};

export default PaymentSuccess;