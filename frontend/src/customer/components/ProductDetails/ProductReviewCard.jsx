import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = ({review}) => {

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, backgroundColor: '#9155fd' }}>
                            {review?.user?.firstName.charAt(0)}
                        </Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className='space-y-2'>
                        <div>
                            <p className='font-semibold text-lg'>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p className='opacity-70'>{formatDate(review?.createdAt)}</p>
                        </div>
                    </div>
                    <Rating value={review?.rating} name='half-rating' precision={0.5} readOnly />
                    <p className=''>{review?.review}</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductReviewCard