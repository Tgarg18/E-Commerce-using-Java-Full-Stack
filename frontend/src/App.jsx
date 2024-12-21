import { useState } from 'react'
import './App.css'
import Navigation from './customer/components/Navigation/Navigation'
import HomePage from './customer/pages/HomePage/HomePage'
import Footer from './customer/components/Footer/Footer'
import Product from './customer/components/Product/Product'

function App() {

  return (
    <div>
      <Navigation />
      <div className=''>
        {/* <HomePage /> */}
        <Product />
      </div>
      <Footer />
    </div>
  )
}

export default App
