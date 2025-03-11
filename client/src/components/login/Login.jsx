import { Link } from "react-router-dom";
import './login.css'

export default function Login() {
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>

                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
}