import React, { useEffect } from 'react';
import AddressCard from '../AddessCard/AddressCard';
import { Button, Divider } from '@mui/material';
import CartItem from '../Cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('order_id');

    const { order } = useSelector(store => store);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={order?.order?.shippingAddress} />
            </div>
            <div>
                <div className='mt-10 lg:grid grid-cols-3 relative'>
                    <div className='col-span-2'>
                        {order?.order?.orderItems?.map((item, index) => <CartItem key={index} item={item} />)}
                    </div>
                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className=''>
                            <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                            <Divider />
                            <div className='space-y-3 font-semibold mb-5'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>₹{order?.order?.totalPrice}</span>
                                </div>
                                <div className='flex justify-between pt-3'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>-₹{order?.order?.discount}</span>
                                </div>
                                <div className='flex justify-between pt-3'>
                                    <span>Delivery Charges</span>
                                    <span className='text-green-600'>{order?.order?.deliveryCharges ? "+₹" + order?.order?.deliveryCharges : "Free"}</span>
                                </div>
                                <div className='flex justify-between pt-3 font-bold'>
                                    <span>Total Amount</span>
                                    <span>₹{order?.order?.totalDiscountedPrice}</span>
                                </div>
                            </div>
                            <Divider />
                            <Button variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", marginTop: "2rem", width: "100%", ":hover": { bgcolor: "#7e4cc9" } }}>
                                Make Payment
                            </Button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default OrderSummary