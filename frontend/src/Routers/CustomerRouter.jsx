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
import ScrollToTop from '../customer/components/ScrollToTop/ScrollToTop'
import ErrorPage from '../customer/pages/ErrorPage/ErrorPage'
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess'
import Profile from '../customer/components/Profile/Profile'
const CustomerRouter = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <ScrollToTop />
            <Routes>
                <Route path='/login' element={<HomePage />} />
                <Route path='/signup' element={<HomePage />} />
                <Route path='/my-profile' element={<Profile />} />
                <Route path='/verify-otp-signin' element={<HomePage />} />
                <Route path='/verify-otp-signup' element={<HomePage />} />
                <Route path='/forgot-password' element={<HomePage />} />
                <Route path='/verify-forgot-password' element={<HomePage />} />
                <Route path='/forgot-password-new-password' element={<HomePage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />} />
                <Route path='/product/:productId' element={<ProductDetails />} />
                <Route path='/product/:productId/addRating' element={<ProductDetails />} />
                <Route path='/product/:productId/addReview' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/account/order' element={<Order />} />
                <Route path='/account/order/:orderId' element={<OrderDetails />} />
                <Route path='/payment/:orderId' element={<PaymentSuccess />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>

            <div className='mt-10'>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRouter