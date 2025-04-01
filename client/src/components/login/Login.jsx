import { useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import userApi from '../../api/userApi.js';
import './login.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        <h2>{t("login.login_button")}</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group-login">
          <label htmlFor="email">{t("login.email")}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            placeholder={t("login.email_placeholder")}
            onChange={handleChange}
          />
        </div>

        <div className="input-group-login">
          <label htmlFor="password">{t("login.password")}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            placeholder={t("login.password_placeholder")}
            onChange={handleChange}
          />
        </div>

        <div className="register-link">
          <p>{t("login.login_text1")}? <Link to="/register">{t("login.login_text2")}</Link></p>
        </div>

        <button type="submit" className="submit-btn">{t("login.login_button")}</button>
      </form>
    </div>
  );
}