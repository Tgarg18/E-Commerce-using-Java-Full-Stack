import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { Rating } from '@mui/material';
import { createRating } from '../../../State/Rating/Action';

const AddRating = ({ productId, handleClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (rating === 0) {
            toast.warning("Please select a rating!");
            return;
        }

        console.log("Submitted Rating:", rating);
        const ratingData = {
            productId: productId,
            rating: rating,
        }
        dispatch(createRating(ratingData, toast, navigate, handleClose));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className='flex justify-center items-center'>
                            <Typography variant='h5' sx={{ fontWeight: 'semibold' }}>
                                Add Ratings
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item xs={12} className='flex justify-center'>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            size="large"
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
                            Submit Rating
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddRating;
