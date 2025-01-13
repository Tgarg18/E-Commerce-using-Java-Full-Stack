import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const OrdersTable = () => {

  const dispatch = useDispatch();
  const { adminOrder } = useSelector(store => store);

  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.shipped, adminOrder.confirmed, adminOrder.delivered,adminOrder.deleteOrder]);

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
  }
  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
  }
  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
  }

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  }

  return (
    <div className='p-5'>
      <Card className='mt-2' sx={{ bgcolor: "#242B2E", color: "white" }}>
        <CardHeader title="All Orders" />
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
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
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
                  <TableCell align="left">
                    <Button id='basic-button' aria-haspopup="true" onClick={(event) => handleClick(event, index)} aria-controls={`basic-menu-${item?.id}`} aria-expanded={Boolean(anchorEl[index])}>
                      Status
                    </Button>
                    <Menu id={`basic-menu-${item?.id}`} anchorEl={anchorEl[index]} open={Boolean(anchorEl[index])} onClose={()=>handleClose(index)} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                      <MenuItem onClick={() => {
                        handleConfirmedOrder(item?.id);
                        handleClose(index);
                      }}>Confirmed Order</MenuItem>
                      <MenuItem onClick={() => {
                        handleShippedOrder(item?.id);
                        handleClose(index);
                      }}>Shipped Order</MenuItem>
                      <MenuItem onClick={() => {
                        handleDeliveredOrder(item?.id);
                        handleClose(index);
                      }}>Delivered Order</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button variant='outlined' color='error' onClick={() => handleDeleteOrder(item?.id)}>
                      Delete
                    </Button>
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

export default OrdersTable;