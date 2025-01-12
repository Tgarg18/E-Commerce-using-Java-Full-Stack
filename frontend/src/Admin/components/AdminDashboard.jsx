import { Grid } from '@mui/material';
import React from 'react'
import Achievement from './Achievement';
import MonthlyOverView from './MonthlyOverView';
import ProductsTable from './ProductsTable';

const AdminDashboard = () => {
  return (
    <div className='p-10'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achievement />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverView />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductsTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashboard;