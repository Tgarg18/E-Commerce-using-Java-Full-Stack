import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { continueWithGoogle } from "../../State/ContinueWithGoogle/Action";

const ContinueWithGoogleButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = async (credentialResponse) => {
    dispatch(continueWithGoogle(credentialResponse, navigate, toast));
  };

  const handleError = () => {
    console.error("Google Login Failed");
    toast.error("Google Login Failed");
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