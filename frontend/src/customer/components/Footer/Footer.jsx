import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

    const footerSections = [
        {
            title: "Company",
            subTitles: ["About", "Contact", "Press", "Jobs", "Partners"],
        },
        {
            title: "Solutions",
            subTitles: ["Marketing", "Analytics", "Commerce", "Insights", "Support"],
        },
        {
            title: "Social",
            subTitles: ["Instagram", "X", "Facebook", "Youtube"],
        },
        {
            title: "Legal",
            subTitles: ["Claim", "Privacy", "Terms"],
        },
    ];

    return (
        <div>
            <Grid
                container
                className="bg-black text-white text-left"
                sx={{
                    bgcolor: "black",
                    color: "white",
                    py: 3,
                }}
            >
                {footerSections.map((section, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: "left", px: 6, marginBottom: 5, marginTop: 5 }}>
                        <Typography
                            variant="h6"
                            sx={{ pb: 2, fontWeight: "bold" }}
                            gutterBottom
                        >
                            {section.title}
                        </Typography>
                        {section.subTitles.map((subTitle, idx) => (
                            <Button
                                key={idx}
                                sx={{
                                    color: "white",
                                    display: "block",
                                    mb: 1,
                                    textTransform: "none",
                                    textAlign: "left",
                                }}
                                aria-label={`Navigate to ${subTitle}`}
                                onClick={() => navigate(`/${section.title.toLowerCase()}/${subTitle.toLowerCase()}`)}
                            >
                                {subTitle}
                            </Button>
                        ))}
                    </Grid>
                ))}
                <Grid className='pt-20' item xs={12}>
                    <Typography variant="body2" component={"p"} align="center" sx={{ color: "white" }}>
                        &copy; 2024 OutfitOasis. All rights reserved.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
