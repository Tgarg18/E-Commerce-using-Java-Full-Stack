import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../customer/pages/HomePage/HomePage'
import Cart from '../customer/components/Cart/Cart'
import Navigation from '../customer/components/Navigation/Navigation'
import Footer from '../customer/components/Footer/Footer'
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import Checkout from '../customer/components/Checkout/Checkout'
import Order from '../customer/components/Order/Order'
import OrderDetails from '../customer/components/Order/OrderDetails'
const CustomerRouter = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>

            <Routes>

                <Route path='/login' element={<HomePage />} />
                <Route path='/signup' element={<HomePage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />} />
                <Route path='/product/:productId' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/account/order' element={<Order />} />
                <Route path='/account/order/:orderId' element={<OrderDetails />} />

            </Routes>

            <div className='mt-10'>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRouter