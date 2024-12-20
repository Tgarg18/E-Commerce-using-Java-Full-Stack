import { useState } from 'react'
import './App.css'
import Navigation from './customer/components/Navigation/Navigation'
import HomePage from './customer/pages/HomePage/HomePage'
import Footer from './customer/components/Footer/Footer'

function App() {

  return (
    <div>
      <Navigation />
      <div className=''>
        <HomePage />
      </div>
      <Footer />
    </div>
  )
}

export default App
