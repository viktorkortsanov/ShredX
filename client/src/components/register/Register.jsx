import './register.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: ''
    });

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            rePassword: formData.rePassword
        };
            
        try {
            const response = await fetch('http://localhost:3030/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err)
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div className="register-container">
            <form className="register-form" method="POST" onSubmit={handleSubmit}>
                <h2>Create an Account</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        placeholder='Enter your username'
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder='Enter your email'
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        placeholder='Enter your password'
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="rePassword">Confirm Password</label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        value={formData.rePassword}
                        placeholder='Confirm your password'
                        onChange={handleChange}
                    />
                </div>

                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>

                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
}