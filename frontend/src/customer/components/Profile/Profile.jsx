import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../../../State/Auth/Action";
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { deepPurple } from "@mui/material/colors";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Profile = () => {

  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(getUser(localStorage.getItem("jwt")));
    }
    setUser(auth.user)
  }, [localStorage.getItem("jwt"), auth.jwt])

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="bg-white lg:px-20">
      <Button
        color='secondary' variant='contained' sx={{ marginBottom: '1rem', px: '2', py: '1', bgcolor: "#9155fd", ":hover": { bgcolor: "#563295" } }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIosIcon fontSize="small" />
        Back
      </Button>
      <div className="pt-3">
        <section className='grid grid-cols-1 gap-x-8 gap-y-10 px-4 pt-10'>
          {/* Personal Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} >
              Personal Information
            </Typography>

            <Box className="space-y-4" display="flex" justifyContent="space-between" mt={1} mx={4}>
              <Box display="flex" gap={4} alignItems="flex-end">
                <Box>
                  <Typography variant="body1" className="text-gray-600" sx={{ fontWeight: 'bold' }}>
                    Name:
                  </Typography>
                  <Typography variant="body1" className="text-gray-600" sx={{ fontWeight: 'bold' }}>
                    Email:
                  </Typography>
                  <Typography variant="body1" className="text-gray-600" sx={{ fontWeight: 'bold' }}>
                    Mobile:
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body1" className="font-semibold">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {user?.email}
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {user?.mobile || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Avatar
                  aria-haspopup="true"
                  sx={{
                    bgcolor: deepPurple[500],
                    color: "white",
                    fontSize: "2.25rem",
                    width: 80,
                    height: 80,
                  }}
                >
                  {user?.firstName ? user?.firstName[0]?.toUpperCase() : ''}
                </Avatar>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                ml: 4,
                bgcolor: "#9155fd",
                ":hover": { bgcolor: "#563295" }
              }}
              onClick={() => navigate('/profile/edit')}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                ml: 4,
                bgcolor: "#9155fd",
                ":hover": { bgcolor: "#563295" }
              }}
              onClick={() => navigate('/profile/change-password')}
            >
              Change Password
            </Button>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-6 py-4 w-full">
            <button className="px-6 py-3 w-1/2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out transform bg-[#9155fd] rounded-lg hover:bg-[#563295] hover:shadow-xl active:scale-95" onClick={() => navigate('/cart')}>
              Cart
            </button>
            <button className="px-6 py-3 w-1/2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out transform bg-[#9155fd] rounded-lg hover:bg-[#563295] hover:shadow-xl active:scale-95" onClick={() => navigate('/wishlist')}>
              Wishlist
            </button>
          </div>

          {/* Addresses */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <Typography variant="h4" className="font-bold mb-6">
              Saved Addresses ({user?.address?.length})
            </Typography>

            <Grid container spacing={3}>
              {user?.address?.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="body1" className="text-gray-500 text-center">
                    No addresses found. Please add a new address.
                  </Typography>
                </Grid>
              )}
              {user?.address?.length > 0 && user?.address?.map((address, index) => (
                <Grid item xs={12} md={6} lg={4} key={address.id}>
                  <div className="border p-4 rounded-lg bg-white">
                    <Typography variant="h6" className="font-semibold mb-2">
                      Address {index + 1}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {address?.streetAddress}<br />
                      {address?.city}, {address?.state} - {address?.pinCode}<br />
                      Mobile: {address?.mobile}
                    </Typography>

                    <Box className="mt-4 space-x-2">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: "#9155fd", borderColor: "#9155fd" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: "#ff4081", borderColor: "#ff4081" }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </div>
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#9155fd",
                ":hover": { bgcolor: "#563295" }
              }}
              onClick={() => navigate('/profile/add-address')}
            >
              Add New Address
            </Button>
          </div>

          {/* Account Actions */}
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "#f44336",
                ":hover": { bgcolor: "#d32f2f" }
              }}
            >
              Logout
            </Button>
          </div>
        </section>
      </div >
    </div >
  )
};

export default Profile;
