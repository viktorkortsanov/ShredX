import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import userApi from '../../api/userApi.js';
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next';
import './register.css';

export default function Register() {
    const { t } = useTranslation();
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
            const { token, user } = await userApi.register(userData);
            dispatch(login({ _id: user._id, email: user.email, username: user.username, isAdmin: user.isAdmin }));
            localStorage.setItem('token', token);

            const templateParams = {
                username: user.username,
                email: user.email,
            };

            const response = await emailjs.send(
                'service_b98xzqr',
                'template_6flqxas',
                templateParams,
                'mxz5zqh2O_h0HA_5_'
            );

            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" method="POST" onSubmit={handleSubmit(handleRegister)}>
                <h2>{t('register.create_account')}</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group-regiser">
                    <label htmlFor="username">{t('register.username')}</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        placeholder={t('register.username_placeholder')}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group-regiser">
                    <label htmlFor="email">{t('register.email')}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        placeholder={t('register.email_placeholder')}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group-regiser">
                    <label htmlFor="password">{t('register.password')}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        placeholder={t('register.password_placeholder')}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group-regiser">
                    <label htmlFor="rePassword">{t('register.confirm_password')}</label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        value={values.rePassword}
                        placeholder={t('register.confirm_password_placeholder')}
                        onChange={handleChange}
                    />
                </div>

                <div className="login-link">
                    <p>{t('register.already_have_account')} <Link to="/login">{t('register.login_here')}</Link></p>
                </div>

                <button type="submit" className="submit-btn">{t('register.register_button')}</button>
            </form>
        </div>
    );
}