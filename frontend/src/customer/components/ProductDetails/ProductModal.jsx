import React, { useState } from 'react'
import { Modal, Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import AddReview from './AddReview';
import AddRating from './AddRating';

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

const ProductModal = ({ handleClose, open, productId }) => {

  const location = useLocation();

  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          navigate(`/product/${productId}`);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            location.pathname.endsWith('/addRating') ?
            <AddRating productId={productId} handleClose={handleClose} />
            : (
                location.pathname.endsWith('/addReview') ?
                  <AddReview productId={productId} handleClose={handleClose} />
                  :
                  null
              )
          }
        </Box>
      </Modal>
    </div>
  )
}

export default ProductModal;