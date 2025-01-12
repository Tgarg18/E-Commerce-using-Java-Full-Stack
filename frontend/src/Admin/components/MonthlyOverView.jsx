import React from 'react';
import { TrendingUp, AccountCircle } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const salesData = [
    {
        stats: '245k',
        title: "Sales",
        color: "#ffb300",
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '12.5k',
        title: "Customers",
        color: "#22CB5C",
        icon: <AccountCircle sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '1.54k',
        title: "Products",
        color: "#DE4839",
        icon: <SettingsCellIcon sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '88k',
        title: "Revenue",
        color: "#12B0E8",
        icon: <CurrencyRupeeIcon sx={{ fontSize: '1.75rem' }} />
    },
];

const renderStats = () => {
    return salesData.map((item, index) =>
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <Avatar variant='rounded' sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: "white",
                    background:
                        `${item.color}`
                }}>
                    {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='caption'>
                        {item.title}
                    </Typography>
                    <Typography variant='h6'>
                        {item.stats}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}

const MonthlyOverView = () => {
    return (
        <Card sx={{ bgcolor: "#242B2E", color: "white" }}>
            <CardHeader title="Monthly Overview" action={<IconButton size='small'>
                <MoreVertIcon />
            </IconButton>}
                subheader={
                    <Typography variant='body2'>
                        <Box component={"span"} sx={{ fontWeight: 600, mx: 2 }}>
                            Total 48.5% Growth
                        </Box>
                        This Month
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: "2rem !important",
                        letterSpacing: ".15px !important"
                    }
                }} />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <Grid container spacing={[5, 0]}>
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MonthlyOverView