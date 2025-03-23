import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { setNewPassword } from '../../State/ForgotPassword/Action';

const NewPasswordForm = ({ modalData }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (data.get('cpassword') === "" || data.get('password') === "") {
            toast.error("All fields are required");
            return;
        }
        if (data.get('cpassword') !== data.get('password')) {
            toast.error("Passwords do not match");
            return;
        }
        if (!passwordRegex.test(data.get('password'))) {
            toast.error('Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character!');
            return;
        }
        dispatch(setNewPassword(modalData?.email, data.get('password'), navigate, toast));
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Set New Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <TextField
                    required
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    label='Password'
                    fullWidth
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
                <TextField
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='cpassword'
                    name='cpassword'
                    label='Confirm Password'
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                    Set Password
                </Button>
            </form>

            <div className='flex justify-center items-center text-sm'>
                <p onClick={() => navigate("/login")} className='hover:underline cursor-pointer mt-2'>Remembered your password? Login</p>
            </div>

        </div>
    );
};

export default NewPasswordForm;