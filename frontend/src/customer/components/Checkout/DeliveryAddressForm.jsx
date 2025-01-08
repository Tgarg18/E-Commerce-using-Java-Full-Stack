import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import AddressCard from '../AddessCard/AddressCard';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../State/Auth/Action';

const DeliveryAddressForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(state => state);

  const handleExistingAddress = () => {
    const address = {
      firstName: auth.user?.firstName,
      lastName: auth.user?.lastName,
      streetAddress: auth.user?.address[auth.user?.address?.length - 1]?.streetAddress,
      city: auth.user?.address[auth.user?.address?.length - 1]?.city,
      state: auth.user?.address[auth.user?.address?.length - 1]?.state,
      pinCode: auth.user?.address[auth.user?.address?.length - 1]?.pinCode,
      mobile: auth.user?.address[auth.user?.address?.length - 1]?.mobile,
    };
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      streetAddress: data.get('address'),
      city: data.get('city'),
      state: data.get('state'),
      pinCode: data.get('pin'),
      mobile: data.get('phoneNumber'),
    };
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    dispatch(getUser(localStorage.getItem('jwt')));
  }, []);

  return (
    <div>
      <Grid container spacing={4} justifyContent={'center'}>
        {auth.user?.address?.length > 0 &&
          <Grid className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll' item xs={12} lg={5}>
            <div className='p-5 py-7 border-b cursor-pointer'>
              <AddressCard address={auth.user?.address[auth.user?.address?.length - 1]} />
              <Button sx={{ mt: 2, bgcolor: '#9155fd', ":hover": { bgcolor: '#7e4cc9' } }} size='large' variant='contained' onClick={() => handleExistingAddress()}>Deliver Here</Button>
            </div>
          </Grid>
        }
        <Grid item xs={12} lg={7} marginTop={-4}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='firstName'
                    name='firstName'
                    label='First Name'
                    fullWidth={true}
                    autoComplete='given-name'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='lastName'
                    name='lastName'
                    label='Last Name'
                    fullWidth={true}
                    autoComplete='given-name, last-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id='address'
                    name='address'
                    label='Address'
                    fullWidth={true}
                    autoComplete='given-name, address-line1, address-line2'
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='city'
                    name='city'
                    label='City'
                    fullWidth={true}
                    autoComplete='given-name, address-level2'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='state'
                    name='state'
                    label='State/Province/Region'
                    fullWidth={true}
                    autoComplete='given-name, address-level3'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='pin'
                    name='pin'
                    label='PIN / Postal Code'
                    fullWidth={true}
                    autoComplete='given-name, address-pin'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='phoneNumber'
                    name='phoneNumber'
                    label='Phone Number'
                    fullWidth={true}
                    autoComplete='given-name, address-phone'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button sx={{ mt: 2, bgcolor: '#9155fd', ":hover": { bgcolor: '#7e4cc9' } }} size='large' variant='contained' type='submit'>
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default DeliveryAddressForm