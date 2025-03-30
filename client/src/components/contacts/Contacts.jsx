import useForm from '../../hooks/useForm';
import './contact.css';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com'

const Contact = () => {
    const user = useSelector((state) => state.auth?.user);

    const { values, handleChange, handleSubmit, error } = useForm({
        name: '',
        email: '',
        message: '',
    });

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

            if (response.ok) {
                console.log(Success);
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="contact-container">
            <div className="company-info">
                <h2 className="title">Contacts</h2>
                <p className="info"><img src="/images/adress.svg" alt="adress" className='icon-contact' />Jungle Gym ulitsa "Kamchija", Svilengrad</p>
                <p className="info"><img src="/images/phone.svg" alt="adress" className='icon-contact' />+359 888 123 456</p>
                <p className="info"><img src="/images/email.svg" alt="adress" className='icon-contact' />shredxcontact@gmail.com</p>
            </div>

            <div className="map-container">
                <iframe
                    className="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.184673041617!2d26.212789767483915!3d41.763043579694354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b46f8f8f8f8f8f%3A0x1234567890abcdef!2sYour+Location!5e0!3m2!1sbg!2sbg!4v1711467890123"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            <div className="contact-form-container">
                <h2 className="title">Contact us</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="contact-form">
                    <div className="form-group-contact">
                        <label htmlFor="name">Subject</label>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={user.email}
                            onChange={handleChange}
                            className="form-input-contact"
                        />
                    </div>
                    <div className="form-group-contact">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            className="form-textarea-contact"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;