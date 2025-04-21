import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CustomerRouter from './Routers/CustomerRouter'
import AdminRouter from './Routers/AdminRouter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setNavigate } from './utils/navigateHelper';
import { useEffect } from 'react';
// import AppSecurity from './AppSecurity';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

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
