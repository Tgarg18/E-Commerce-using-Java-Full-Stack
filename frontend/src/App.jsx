import './App.css'
import { Route, Routes } from 'react-router-dom'
import CustomerRouter from './Routers/CustomerRouter'
import AdminRouter from './Routers/AdminRouter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AppSecurity from './AppSecurity';

function App() {

  return (
    <div>
      {/* <AppSecurity /> */}
      <Routes>
        <Route path='/*' element={<CustomerRouter />} />
        <Route path='/admin/*' element={<AdminRouter />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
