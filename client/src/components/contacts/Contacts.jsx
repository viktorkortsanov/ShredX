import useForm from '../../hooks/useForm';
import './contact.css';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Contact = () => {
    const user = useSelector((state) => state.auth?.user);
    const { t } = useTranslation();

    const { values, handleChange, handleSubmit, error } = useForm({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        if (user?.email) {
            handleChange({ target: { name: 'email', value: user.email } });
        }
    }, [user]);

    const handleFormSubmit = async () => {
        const templateParams = {
            username: user.username,
            email: values.email,
            subject: values.name,
        };

        try {
            const response = await emailjs.send(
                'service_b98xzqr',
                'template_bvsfkrd',
                templateParams,
                'mxz5zqh2O_h0HA_5_'
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="contact-container">
            <div className="company-info">
                <h2 className="title">{t('footer.contact')}</h2>
                <p className="info">
                    <img src="/images/adress.svg" alt="adress" className='icon-contact' />
                    {t('contacts.address')}
                </p>
                <p className="info">
                    <img src="/images/phone.svg" alt="phone" className='icon-contact' />
                    +359 888 123 456
                </p>
                <p className="info">
                    <img src="/images/email.svg" alt="email" className='icon-contact' />
                    shredxcontact@gmail.com
                </p>
            </div>

            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2976.0296483416255!2d26.21022557589871!3d41.76301857125457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b2cf9a4b87d0eb%3A0xec9794e7b9362420!2sJungle%20Gym!5e0!3m2!1sbg!2sbg!4v1744993894564!5m2!1sbg!2sbg"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>


            </div>

            <div className="contact-form-container">
                <h2 className="title">{t('contacts.contactUs')}</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="contact-form">
                    <div className="form-group-contact">
                        <label htmlFor="name">{t('contacts.subject')}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="form-input-contact"
                        />
                    </div>
                    <div className="form-group-contact">
                        <label htmlFor="email">{t('register.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="form-input-contact"
                        />
                    </div>
                    <div className="form-group-contact">
                        <label htmlFor="message">{t('contacts.message')}</label>
                        <textarea
                            id="message"
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            className="form-textarea-contact"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">{t('contacts.button')}</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;