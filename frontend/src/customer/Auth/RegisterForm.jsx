import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, sendSignupOtp } from '../../State/Auth/Action';
import { toast } from "react-toastify";

const RegisterForm = ({ setModalData }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const navigate = useNavigate();

    const dispatch = useDispatch();

    const jwt = localStorage.getItem('jwt');

    const { auth } = useSelector(store => store);

    useEffect(() => {
        if (jwt)
            dispatch(getUser(jwt));
    }, [jwt, auth.jwt]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const data = new FormData(event.currentTarget);
        if (!data.get('firstName') || !data.get('lastName') || !data.get('email') || !data.get('password') || !data.get('confirmPassword')) {
            toast.error("All fields are required!");
            return;
        }
        if (data.get('password') !== data.get('confirmPassword')) {
            toast.error("Password and confirm password do not match!");
            return;
        }
        if (!passwordRegex.test(data.get('password'))) {
            toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!");
            return;
        }
        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        };
        console.log("User Data: ", userData);
        setModalData(userData);
        dispatch(sendSignupOtp(userData, navigate));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='firstName'
                            name='firstName'
                            label='First Name'
                            fullWidth={true}
                            autoComplete='given-name'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='lastName'
                            name='lastName'
                            label='Last Name'
                            fullWidth={true}
                            autoComplete='family-name'
                        />
                    </Grid>
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
                        <TextField
                            required
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            name='confirmPassword'
                            label='Confirm Password'
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
                            Register
                        </Button>
                    </Grid>

                </Grid>
            </form>

            <div className='flex justify-center items-center'>
                <p onClick={() => navigate("/login")} className='hover:underline cursor-pointer mt-5'>Already have an account? Login</p>
            </div>

        </div>
    )
}

export default RegisterForm