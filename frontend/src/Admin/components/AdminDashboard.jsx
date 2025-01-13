import { Grid } from '@mui/material';
import React from 'react'
import Achievement from './Achievement';
import MonthlyOverView from './MonthlyOverView';
import ProductsTable from './ProductsTable';
import OrdersTableView from '../view/OrderTableView';
import ProductsTableView from '../view/ProductsTableView';

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
          <OrdersTableView />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductsTableView />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashboard;