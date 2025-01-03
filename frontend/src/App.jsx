import './App.css'
import Checkout from './customer/components/Checkout/Checkout'
import Order from './customer/components/Order/Order'
import OrderDetails from './customer/components/Order/OrderDetails'
import { Route, Routes } from 'react-router-dom'
import CustomerRouter from './Routers/CustomerRouter'
import ScrollToTop from './customer/components/ScrollToTop/ScrollToTop'

function App() {

  return (
    <div>
      <Routes>
        <ScrollToTop />
        <Route path='/*' element={<CustomerRouter />} />
      </Routes>
    </div>
  )
}

export default App
