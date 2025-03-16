import React from 'react'
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 className='text-2xl font-bold'>404 - Page Not Found</h1>
            <p className='text-xl py-3'>The page you are looking for does not exist. Check the URL.</p>
            <p onClick={() => navigate('/')} className="text-blue-700 cursor-pointer hover:underline hover:text-blue-500">
                Go to Home
            </p>

        </div>
    )
}

export default ErrorPage