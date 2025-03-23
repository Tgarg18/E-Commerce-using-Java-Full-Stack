import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import VerifyOtpSignin from './VerifyOtpSignin';
import VerifyOtpSignup from './VerifyOtpSignup';
import ForgotPasswordForm from './ForgotPasswordForm';
import VerifyOtpForgotPassword from './VerifyOtpForgotPassword';
import NewPasswordForm from './NewPasswordForm';

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

  const modalComponents = {
    '/login': <LoginForm setModalData={setModalData} />,
    '/signup': <RegisterForm setModalData={setModalData} />,
    '/verify-otp-signin': <VerifyOtpSignin modalData={modalData} />,
    '/verify-otp-signup': <VerifyOtpSignup modalData={modalData} />,
    '/forgot-password': <ForgotPasswordForm setModalData={setModalData} />,
    '/verify-forgot-password': <VerifyOtpForgotPassword modalData={modalData} />,
    '/forgot-password-new-password': <NewPasswordForm modalData={modalData} />,
  };

  const renderComponent = modalComponents[location.pathname] || null;

  return (
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
        <Box sx={style}>{renderComponent}</Box>
      </Modal>
    </AuthContext.Provider>
  );
};

export default AuthModal;