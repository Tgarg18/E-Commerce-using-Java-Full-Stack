import './App.css'
import Checkout from './customer/components/Checkout/Checkout'
import Order from './customer/components/Order/Order'
import OrderDetails from './customer/components/Order/OrderDetails'
import { Route, Routes } from 'react-router-dom'
import CustomerRouter from './Routers/CustomerRouter'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/*' element={<CustomerRouter />} />
      </Routes>
    </div>
  )
}

export default App
