import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUser } from '../../../State/Order/Action'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const orderStatus = [
    { label: 'Placed', value: 'PLACED' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Cancelled', value: 'CANCELLED' },
]

const Order = () => {
    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    const navigate = useNavigate();

    const [selectedStatuses, setSelectedStatuses] = useState([]);

    useEffect(() => {
        dispatch(getOrderByUser());
    }, [dispatch, order.createOrder, order.getOrderById]);

    const handleStatusChange = (status) => {
        setSelectedStatuses(prev => 
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const filteredOrders = selectedStatuses.length > 0
        ? order?.orders?.filter(item => selectedStatuses.includes(item?.orderStatus))
        : order?.orders;

    return (
        <div className='px-5 lg:px-20'>
            <Button
                color='secondary' variant='contained'
                sx={{ marginBottom: '1rem', px: '2', py: '1', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" } }}
                onClick={() => navigate("/")}
            >
                <ArrowBackIosIcon fontSize="small" />
                Back
            </Button>
            <Grid container sx={{ justifyContent: 'space-between' }}>
                {/* Filter Section */}
                <Grid item xs={2.5}>
                    <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className='font-bold text-lg'>Filter</h1>
                        <div className='space-y-4 mt-10'>
                            <h1 className='font-semibold'>ORDER STATUS</h1>
                            {orderStatus.map((option, index) => (
                                <div className='flex items-center' key={index}>
                                    <input
                                        type='checkbox'
                                        id={option.value}
                                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                        checked={selectedStatuses.includes(option.value)}
                                        onChange={() => handleStatusChange(option.value)}
                                    />
                                    <label htmlFor={option.value} className='ml-3 text-sm text-gray-600'>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Orders List */}
                <Grid item xs={9}>
                    <div className='space-y-5'>
                        {filteredOrders && filteredOrders.length > 0 ? (
                            filteredOrders.map((item, index) => <OrderCard key={index} order={item} />)
                        ) : (
                            <p className='text-gray-500 text-center'>No orders found</p>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Order;
