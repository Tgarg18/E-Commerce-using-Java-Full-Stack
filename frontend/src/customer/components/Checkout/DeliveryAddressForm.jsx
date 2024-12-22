import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import AddressCard from '../AddessCard/AddressCard'

const DeliveryAddressForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Address Submitted Successfully');
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      address: data.get('address'),
      city: data.get('city'),
      state: data.get('state'),
      pin: data.get('pin'),
      phoneNumber: data.get('phoneNumber'),
    }
    console.log("Address Data: ", address);
  }
  return (
    <div>
      <Grid container spacing={4}>
        <Grid className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll' item xs={12} lg={5}>
          <div className='p-5 py-7 border-b cursor-pointer'>
            <AddressCard />
            <Button sx={{ mt: 2, bgcolor: '#9155fd', ":hover": { bgcolor: '#7e4cc9' } }} size='large' variant='contained'>Deliver Here</Button>
          </div>
        </Grid>
        <Grid item xs={12} lg={7}>
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