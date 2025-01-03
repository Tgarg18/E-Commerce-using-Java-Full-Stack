import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../State/Auth/Action';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log("User Data: ", userData);
        dispatch(login(userData));
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