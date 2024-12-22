import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, backgroundColor: '#9155fd' }}>
                            {"Tushar".charAt(0)}
                        </Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className='space-y-2'>
                        <div>
                            <p className='font-semibold text-lg'>{"Tushar"}</p>
                            <p className='opacity-70'>{"December 22, 2024"}</p>
                        </div>
                    </div>
                    <Rating value={4.5} name='half-rating' precision={0.5} readOnly />
                    <p className=''>Nice product, i love this shirt.</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductReviewCard