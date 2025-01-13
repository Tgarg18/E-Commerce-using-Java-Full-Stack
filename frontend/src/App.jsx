import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerRouter from './Routers/CustomerRouter'
import AdminRouter from './Routers/AdminRouter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/*' element={<CustomerRouter />} />
        <Route path='/admin/*' element={<AdminRouter />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
