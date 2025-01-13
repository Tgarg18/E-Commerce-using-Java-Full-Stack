import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
const ProductsTable = () => {

  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000000,
      minDiscount: 0,
      sort: 'price_low',
      pageNumber: 1,
      pageSize: 10,
      stock: "",
    }
    dispatch(findProducts(data));
  }, [products.deletedProduct]);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className='p-5'>
      <Card className='mt-2' sx={{ bgcolor: "#242B2E", color: "white" }}>
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.products?.content?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item?.imageUrl} />
                  </TableCell>
                  <TableCell component="th" align='left' scope="row">
                    {item?.title}
                  </TableCell>
                  <TableCell align="left">{item?.category?.name}</TableCell>
                  <TableCell align="left">₹{item?.price}</TableCell>
                  <TableCell align="left">{item?.quantity}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleProductDelete(item?.id)} variant='outlined' color='error'>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default ProductsTable