import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContinueWithGoogleButton = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/google`, {
        token: credentialResponse.credential,
      });
      console.log(response.data);
      localStorage.setItem("jwt", response.data.jwt);
      toast.success("Google Sign-In Successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Authentication Failed", error);
      toast.error("Authentication Failed");
      navigate("/login");
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
    alert("Google Login Failed");
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        width={"100%"}
        size="large"
        text="continue_with"
        logo_alignment="center"
      />
    </div>
  );
};

export default ContinueWithGoogleButton;  