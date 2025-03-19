import { Button, Grid, TextField, Typography, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { createReview } from '../../../State/Review/Action';

const AddReview = ({ productId, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating === 0) {
      toast.warning("Please select a rating!");
      return;
    }
    if (!review.trim()) {
      toast.warning("Please add a review!");
      return;
    }
    console.log("Submitted Rating:", rating, "Review:", review);
    const reviewData = {
      productId: productId,
      rating: rating,
      review: review,
    }
    dispatch(createReview(reviewData, toast, navigate, handleClose));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className='flex justify-center items-center'>
              <Typography variant='h5' sx={{ fontWeight: 'semibold' }}>
                Add Review
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
            <TextField
              required
              id='review'
              name='review'
              label='Write your review'
              fullWidth
              multiline
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
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
              Submit Review
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddReview;
