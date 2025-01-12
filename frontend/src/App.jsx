import './App.css'
import Checkout from './customer/components/Checkout/Checkout'
import Order from './customer/components/Order/Order'
import OrderDetails from './customer/components/Order/OrderDetails'
import { Route, Routes } from 'react-router-dom'
import CustomerRouter from './Routers/CustomerRouter'
import ScrollToTop from './customer/components/ScrollToTop/ScrollToTop'
import AdminRouter from './Routers/AdminRouter'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/*' element={<CustomerRouter />} />
        <Route path='/admin/*' element={<AdminRouter />} />
      </Routes>
    </div>
  )
}

export default App
