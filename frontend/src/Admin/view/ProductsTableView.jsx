import { Avatar, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
const ProductsTableView = () => {

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

    return (
        <div>
            <Card className='mt-2' sx={{ bgcolor: "#242B2E", color: "white" }}>
                <CardHeader title="Recent Products" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Category</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.products?.content?.slice(0, 10)?.map((item, index) => (
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default ProductsTableView;