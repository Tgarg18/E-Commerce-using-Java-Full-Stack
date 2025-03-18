import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifySignupOtp } from '../../State/Auth/Action';
import { toast } from "react-toastify";

const VerifyOtpSignup = ({ modalData }) => {
    const [seconds, setSeconds] = useState(60);  // dynamic krna hai isko abhi
    const timerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (seconds > 0) {
            timerRef.current = setTimeout(() => setSeconds(prev => prev - 1), 1000);
        } else {
            toast.error("OTP Expired! Please Try Again");
            navigate('/login');
        }
        return () => clearTimeout(timerRef.current);
    }, [seconds]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const otp = data.get('otp');
        if (!otp) {
            toast.warning("Fill in OTP!");
            return;
        }

        dispatch(verifySignupOtp(modalData?.email, otp, modalData, toast, navigate));

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className='flex justify-center items-center'>
                            <Typography variant='h5' sx={{ fontWeight: 'semibold' }}>
                                OTP Verification
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div className='mb-2'>
                            <Typography variant='h6' sx={{ fontWeight: 'semibold', fontSize: '0.9rem' }}>
                                OTP is sent to email: {modalData?.email}
                            </Typography>
                        </div>
                        <TextField
                            required
                            id='otp'
                            name='otp'
                            label='OTP'
                            fullWidth
                            autoComplete='otp'
                        />
                        <div className='mt-2'>
                            <Typography variant='h6' sx={{ fontWeight: 'semibold', fontSize: '0.9rem', color: 'red' }}>
                                OTP will expire in {seconds} seconds
                            </Typography>
                        </div>
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
                            Verify OTP
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div className='flex justify-center items-center'>
                <p onClick={() => navigate("/signup")} className='cursor-pointer mt-5 hover:underline'>
                    OTP expired or not received ? Try to Login Again
                </p>
            </div>
        </div>
    );
};

export default VerifyOtpSignup;
