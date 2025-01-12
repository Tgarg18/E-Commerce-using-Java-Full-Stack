import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {

  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? name = "quantity" : name = e.target.name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
  };

  return (
    <div className='p-10'>
      <Typography variant='h3' sx={{ textAlign: "center" }} className='py-10 text-center'>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit} className='min-h-screen'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField required fullWidth label="Image URL" name="imageUrl" onChange={handleChange} value={productData.imageUrl} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth label="Brand" name="brand" onChange={handleChange} value={productData.brand} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth label="Title" name="title" onChange={handleChange} value={productData.title} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth label="Color" name="color" onChange={handleChange} value={productData.color} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth label="Quantity" name="quantity" onChange={handleChange} value={productData.quantity} type='number' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField required fullWidth label="Price" name="price" onChange={handleChange} value={productData.price} type='number' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField required fullWidth label="Discounted Price" name="discountedPrice" onChange={handleChange} value={productData.discountedPrice} type='number' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField required fullWidth label="Discount Percentage" name="discountPercent" onChange={handleChange} value={productData.discountPercent} type='number' />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl required fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select name='topLevelCategory' value={productData.topLevelCategory} onChange={handleChange} label="Top Level Category">
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl required fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select name='secondLevelCategory' value={productData.secondLevelCategory} onChange={handleChange} label="Second Level Category">
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl required fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select name='thirdLevelCategory' value={productData.thirdLevelCategory} onChange={handleChange} label="Third Level Category">
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth id='outlined-multiline-static' label="Description" multiline name="description" rows={3} onChange={handleChange} value={productData.description} />
          </Grid>
          {
            productData?.size?.map((size, index) => (
              <Grid container item spacing={3} key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Size Name" name='name' value={size.name} onChange={(e) => handleSizeChange(e, index)} required fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Quantity" name='size_quantity' type='number' onChange={(e) => handleSizeChange(e, index)} required fullWidth />
                </Grid>
              </Grid>
            ))
          }
          <Grid item xs={12}>
            <Button variant='contained' type='submit' sx={{ p: 1.8 }} className='py-20' size='large'>
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default CreateProductForm;