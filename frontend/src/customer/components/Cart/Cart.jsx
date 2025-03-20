import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../State/Cart/Action'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { cart } = useSelector(store => store);

    const handleCheckout = () => {
        navigate('/checkout?step=2');
    };

    useEffect(() => {
        dispatch(getCart());
    }, [cart.updateCartItem, cart.deleteCartItem]);

    if (cart?.cart?.cartItems.length == 0) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="text-2xl text-center text-gray-500">
                    Your cart <ShoppingCartIcon /> is empty.
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {cart?.cart?.cartItems
                        ?.slice()
                        ?.sort((a, b) =>
                            String(a?.id || "").localeCompare(String(b?.id || ""))
                        )
                        ?.map((item, index) => <CartItem key={index} item={item} />)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className=''>
                        <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                        <Divider />
                        <div className='space-y-3 font-semibold mb-5'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>₹{cart.cart?.totalPrice}</span>
                            </div>
                            <div className='flex justify-between pt-3'>
                                <span>Discount</span>
                                <span className='text-green-600'>-₹{cart.cart?.discount}</span>
                            </div>
                            <div className='flex justify-between pt-3'>
                                <span>Delivery Charges</span>
                                <span className='text-green-600'>{cart.cart?.deliveryCharges ? "₹" + cart.cart?.deliveryCharges : "Free"}</span>
                            </div>
                            <div className='flex justify-between pt-3 font-bold'>
                                <span>Total Amount</span>
                                <span>₹{cart.cart?.totalDiscountedPrice}</span>
                            </div>
                        </div>
                        <Divider />
                        <Button onClick={handleCheckout} variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", marginTop: "2rem", width: "100%", ":hover": { bgcolor: "#7e4cc9" } }}>
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart