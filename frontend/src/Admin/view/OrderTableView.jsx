import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../State/Admin/Order/Action';
import { Avatar, AvatarGroup, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const OrdersTableView = () => {

    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store);

    useEffect(() => {
        dispatch(getOrders());
    }, [adminOrder.shipped, adminOrder.confirmed, adminOrder.delivered, adminOrder.deleteOrder]);

    return (
        <div className=''>
            <Card className='mt-2' sx={{ bgcolor: "#242B2E", color: "white" }}>
                <CardHeader title="Recent Orders" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Total Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder?.orders?.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        <AvatarGroup max={2} sx={{ justifyContent: 'left' }}>
                                            {item?.orderItems?.map((orderItem, index) =>
                                                <Avatar src={orderItem?.product?.imageUrl} key={index} />
                                            )}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell component="th" align='left' scope="row">
                                        {item?.orderItems?.map((orderItem, index) =>
                                            <p key={index}>
                                                {orderItem?.product?.title}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell align="left">{item?.id}</TableCell>
                                    <TableCell align="left">₹{item?.totalPrice}</TableCell>
                                    <TableCell align="left">{item?.totalItem}</TableCell>
                                    <TableCell align="left">
                                        <span className={`text-white px-5 py-2 rounded-md ${item.orderStatus === "CONFIRMED" ? 'bg-green-600' : item.orderStatus === "SHIPPED" ? 'bg-blue-600' : item.orderStatus === "PLACED" ? "bg-gray-500" :
                                            item.orderStatus === "PENDING" ? 'bg-red-600' : 'bg-yellow-600'}`}>
                                            {item?.orderStatus}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
};

export default OrdersTableView;