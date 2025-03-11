import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notfound.css';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>The page you are looking for does not exist. Please check the URL or return to the homepage.</p>
            <button 
                onClick={handleGoHome} 
                className="not-found-button"
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default NotFound;
