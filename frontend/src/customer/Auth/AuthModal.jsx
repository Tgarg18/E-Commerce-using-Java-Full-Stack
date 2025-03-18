import React, { useState } from 'react'
import { Modal, Box } from '@mui/material'
import RegisterForm from './RegisterForm';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import VerifyOtpSignin from './VerifyOtpSignin';
import VerifyOtpSignup from './VerifyOtpSignup';
import { AuthContext } from '../../context/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ handleClose, open }) => {

  const location = useLocation();

  const navigate = useNavigate();

  const [modalData, setModalData] = useState(null);

  return (
    <div>
      <AuthContext.Provider value={{ modalData, setModalData }}>
        <Modal
          open={open}
          onClose={() => {
            setModalData(null);
            handleClose();
            navigate('/');
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {
              location.pathname === '/login' ?
                <LoginForm setModalData={setModalData} />
                : (
                  location.pathname === '/signup' ?
                    <RegisterForm setModalData={setModalData} />
                    :
                    (
                      location.pathname === '/verify-otp-signin' ?
                        <VerifyOtpSignin modalData={modalData} />
                        :
                        (
                          location.pathname === '/verify-otp-signup' ?
                            <VerifyOtpSignup modalData={modalData} />
                            :
                            null
                        )
                    )
                )
            }
          </Box>
        </Modal>
      </AuthContext.Provider>
    </div>
  )
}

export default AuthModal