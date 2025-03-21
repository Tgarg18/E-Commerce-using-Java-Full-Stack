import { Button, Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, sendSignupOtp } from '../../State/Auth/Action';
import { toast } from 'react-toastify';
import ContinueWithGoogleButton from './ContinueWithGoogleButton';

const RegisterForm = ({ setModalData }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { auth } = useSelector((store) => store);

    useEffect(() => {
        if (jwt) dispatch(getUser(jwt));
    }, [jwt, auth.jwt]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const data = new FormData(event.currentTarget);

        if (!data.get('firstName') || !data.get('lastName') || !data.get('email') || !data.get('password') || !data.get('confirmPassword')) {
            toast.error('All fields are required!');
            return;
        }
        if (data.get('password') !== data.get('confirmPassword')) {
            toast.error('Password and Confirm Password do not match!');
            return;
        }
        if (!passwordRegex.test(data.get('password'))) {
            toast.error('Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character!');
            return;
        }

        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        };

        console.log('User Data: ', userData);
        setModalData(userData);
        dispatch(sendSignupOtp(userData, navigate));
    };

    return (
        <div className="flex justify-center items-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete="given-name" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete="family-name" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="email" name="email" label="Email" fullWidth autoComplete="email" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                label="Password"
                                fullWidth
                                autoComplete="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                fullWidth
                                autoComplete="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            padding: '0.8rem 0',
                            bgcolor: '#9155FD',
                            ':hover': { bgcolor: '#7E3AF2' },
                        }}
                    >
                        Register
                    </Button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex justify-center my-4">
                    <ContinueWithGoogleButton />
                </div>
                <div className='flex justify-center items-center'>
                    <p onClick={() => navigate("/login")} className='hover:underline cursor-pointer mt-2'>Already have an account? Login</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
