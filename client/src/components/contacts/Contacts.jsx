import useForm from '../../hooks/useForm';
import './contact.css';
import { useSelector } from 'react-redux';

const Contact = () => {
    const userEmail = useSelector((state) => state.auth.user?.email);
    console.log(userEmail);
    
    const { values, handleChange, handleSubmit, error } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleFormSubmit = async (data) => {
        console.log('Form data submitted:', data);
        alert('Вашето съобщение беше изпратено!');
    };

    return (
        <div className="contact-container">
            <div className="company-info">
                <h2 className="title">Contacts</h2>
                <p className="info"><strong>Name:</strong> ShredX</p>
                <p className="info"><strong>Adress:</strong> Jungle Gym ulitsa "Kamchija", Svilengrad</p>
                <p className="info"><strong>Phone number:</strong> +359 888 123 456</p>
                <p className="info"><strong>Email:</strong> contact@shredx.com</p>
            </div>

            <div className="map-container">
                <iframe
                    className="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.1640835873014!2d23.321867615768647!3d42.69770847916888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa857fc67a2a21%3A0x64b0b935f3d636bb!2z0KHQsNC0INGD0LvQuNGG0LjRjywg0KHQsNC0INCS0L7Qu9C40LXQvdC40YfQtdGB0LrQuNC5!5e0!3m2!1sbg!2sbg!4v1711467890123"
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
                            defaultValue={userEmail}
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