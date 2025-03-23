import { Button, Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendLoginOtp } from '../../State/Auth/Action';
import { toast } from "react-toastify";
import ContinueWithGoogleButton from './ContinueWithGoogleButton';

const LoginForm = ({ setModalData }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('email') === "" || data.get('password') === "") {
            toast.error("All fields are required");
            return;
        }
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        setModalData(null);
        setModalData({
            email: data.get('email'),
        });
        dispatch(sendLoginOtp(userData, toast, navigate));
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    required
                    id='email'
                    name='email'
                    label='Email'
                    fullWidth
                    autoComplete='email'
                    variant="outlined"
                />
                <TextField
                    required
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    label='Password'
                    fullWidth
                    autoComplete='password'
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{
                        padding: "0.8rem 0",
                        bgcolor: "#9155FD",
                        ':hover': { bgcolor: "#7E3AF2" }
                    }}
                >
                    Login
                </Button>
            </form>

            <div className='flex justify-center items-center text-sm'>
                <p onClick={() => navigate("/forgot-password")} className='hover:underline cursor-pointer'>Forgot Password?</p>
            </div>

            <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
                <hr className="flex-grow border-gray-300" />
            </div>

            <div className='flex justify-center'>
                <ContinueWithGoogleButton />
            </div>
            <div className='flex justify-center items-center text-sm'>
                <p onClick={() => navigate("/signup")} className='hover:underline cursor-pointer mt-2'>Don't have an account? Sign up</p>
            </div>
        </div>
    );
};

export default LoginForm;