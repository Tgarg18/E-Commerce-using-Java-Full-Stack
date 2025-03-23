import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { sendForgotPasswordOtp } from "../../State/ForgotPassword/Action";

const ForgotPasswordForm = ({ setModalData }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (!email) {
            toast.warning("Please enter your email!");
            return;
        }
        setModalData(null);
        setModalData({ email });
        dispatch(sendForgotPasswordOtp(email, navigate, toast));
        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className="flex justify-center items-center">
                            <Typography variant="h5" sx={{ fontWeight: "semibold" }}>
                                Forgot Password
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            className="w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                padding: "0.8rem 0",
                                bgcolor: "#9155FD",
                                ":hover": { bgcolor: "#7E3AF2" },
                            }}
                        >
                            {loading ? "Processing..." : "Reset Password"}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div className="flex justify-center items-center">
                <p onClick={() => navigate("/login")} className="cursor-pointer mt-5 hover:underline">
                    Remembered your password? Login
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
