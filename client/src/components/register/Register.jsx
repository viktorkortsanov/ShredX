import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import userApi from '../../api/userApi.js';
import './register.css';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { values, handleChange, handleSubmit, error, setError } = useForm({
        username: '',
        email: '',
        password: '',
        rePassword: ''
    });

    const handleRegister = async (userData) => {
        try {
            await userApi.register(userData);
            dispatch(loginSuccess(userData));
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" method="POST" onSubmit={handleSubmit(handleRegister)}>
                <h2>Create an Account</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        placeholder="Enter your username"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="rePassword">Confirm Password</label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        value={values.rePassword}
                        placeholder="Confirm your password"
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