import { useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import userApi from '../../api/userApi.js';
import './login.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, error, setError } = useForm({
    email: '',
    password: '',
  });

  const submitLogin = async (userData) => {
    try {
      const { token, user } = await userApi.login(userData);
      dispatch(login({ _id: user._id, email: user.email, username: user.username, isAdmin: user.isAdmin }));
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" method="POST" onSubmit={handleSubmit(submitLogin)}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group-login">
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

        <div className="input-group-login">
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