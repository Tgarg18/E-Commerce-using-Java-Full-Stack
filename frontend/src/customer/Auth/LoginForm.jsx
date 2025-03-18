import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendLoginOtp } from '../../State/Auth/Action';
import { toast } from "react-toastify";

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
        }
        setModalData({
            email: data.get('email'),
        });
        dispatch(sendLoginOtp(userData, toast, navigate));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id='email'
                            name='email'
                            label='Email'
                            fullWidth={true}
                            autoComplete='email'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            label='Password'
                            fullWidth={true}
                            autoComplete='password'
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button className='w-full'
                            type='submit'
                            variant='contained'
                            size='large'
                            sx={{
                                padding: "0.8rem 0", bgcolor: "#9155FD",
                                ":hover": { bgcolor: "#7E3AF2" }
                            }}
                        >
                            Login
                        </Button>
                    </Grid>

                </Grid>
            </form>

            <div className='flex justify-center items-center'>
                <p onClick={() => navigate("/signup")} className='cursor-pointer mt-5 hover:underline'>Don't have an account? Signup</p>
            </div>

        </div>
    )
}

export default LoginForm