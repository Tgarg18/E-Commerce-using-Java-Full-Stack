import React from 'react'
import CartItem from './CartItem'
import { Button, Divider } from '@mui/material'

const Cart = () => {
    return (
        <div>

            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {[1, 1, 1, 1].map((item, index) => <CartItem key={index} />)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className=''>
                        <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                        <Divider />
                        <div className='space-y-3 font-semibold mb-5'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>₹4697</span>
                            </div>
                            <div className='flex justify-between pt-3'>
                                <span>Discount</span>
                                <span className='text-green-600'>-₹3419</span>
                            </div>
                            <div className='flex justify-between pt-3'>
                                <span>Delivery Charges</span>
                                <span className='text-green-600'>Free</span>
                            </div>
                            <div className='flex justify-between pt-3 font-bold'>
                                <span>Total Amount</span>
                                <span>₹1278</span>
                            </div>
                        </div>
                        <Divider />
                        <Button variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", marginTop: "2rem", width: "100%", ":hover": { bgcolor: "#7e4cc9" } }}>
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Cart