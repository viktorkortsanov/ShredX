import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import useForm from "../../hooks/useForm.js";
import { AuthContext } from "../../contexts/authContext.jsx"

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const { values, handleChange, handleSubmit, error, setError } = useForm({
        email: "",
        password: "",
    });

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!userData) return;

        const submitLogin = async () => {
            try {
                const response = await fetch("http://localhost:3030/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.err);
                }
                
                setIsAuthenticated(true);
                navigate("/");
            } catch (err) {
                setError(err.message);
            }
        };

        submitLogin();
    }, [userData, navigate, setError, setIsAuthenticated]);

    return (
        <div className="login-container">
            <form className="login-form" method="POST" onSubmit={handleSubmit(setUserData)}>
                <h2>Login</h2>

                {error && <p className="error">{error}</p>}

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

                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>

                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
}