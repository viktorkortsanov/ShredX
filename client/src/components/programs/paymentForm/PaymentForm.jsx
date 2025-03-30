import { useState, useEffect } from 'react';
import useForm from '../../../hooks/useForm.js';
import programs from '../programsData.js';
import './PaymentForm.css';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentForm = () => {
    const { programId } = useParams();
    const program = programs.find(prog => prog.id.toString() === programId.toString());
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit, error, setError } = useForm({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        nameOnCard: '',
        securityCode: '',
    });

    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [cardType, setCardType] = useState('');

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0; i < match.length; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const detectCardType = (cardNumber) => {
        const number = cardNumber.replace(/\s+/g, '');

        if (number.startsWith('4')) {
            return 'visa';
        } else if (/^5[1-5]/.test(number)) {
            return 'mastercard';
        } else if (/^3[47]/.test(number)) {
            return 'amex';
        }

        return '';
    };

    useEffect(() => {
        if (values.cardNumber) {
            const type = detectCardType(values.cardNumber);
            setCardType(type);
        } else {
            setCardType('');
        }
    }, [values.cardNumber]);


    const handleFormattedChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            const formattedValue = formatCardNumber(value);

            setValues({
                ...values,
                [name]: formattedValue
            });
        } else if (name === 'expirationDate') {
            let formattedValue = value.replace(/[^\d]/g, '');

            if (formattedValue.length > 0) {
                if (formattedValue.length <= 2) {
                } else {
                    formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2, 4)}`;
                }
            }

            setValues({
                ...values,
                [name]: formattedValue
            });
        } else if (name === 'cvv' || name === 'securityCode') {
   
            const formattedValue = value.replace(/\D/g, '').substring(0, 4);

            setValues({
                ...values,
                [name]: formattedValue
            });
        } else {
            handleChange(e);
        }
    };

    const submitPayment = async () => {
      
        if (!values.nameOnCard) {
            setError('Please enter the name on card');
            return;
        }

        if (!values.cardNumber || values.cardNumber.replace(/\s/g, '').length < 16) {
            setError('Please enter a valid card number');
            return;
        }

        if (!values.expirationDate || values.expirationDate.length < 5) {
            setError('Please enter a valid expiration date (MM/YY)');
            return;
        }

        if (!values.cvv || values.cvv.length < 3) {
            setError('Please enter a valid CVV code');
            return;
        }

        try {
  
            const purchasedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
            purchasedPrograms.push(programId);
            localStorage.setItem('purchasedPrograms', JSON.stringify(purchasedPrograms));

            const purchaseDates = JSON.parse(localStorage.getItem('purchaseDates')) || {};
            purchaseDates[programId] = new Date().toISOString();
            localStorage.setItem('purchaseDates', JSON.stringify(purchaseDates));

            const response = await fetch(`http://localhost:3030/programs/pay/${programId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ programId }),
            });

            if (response.ok) {
                setIsPaymentSuccessful(true);
                setTimeout(() => {
                    navigate('/programs');
                }, 2000);
            } else {
                setError('Payment failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Error processing payment. Please try again later.');
        }
    };

    return (
        <div className="payment-main-container">
            <div className="payment-main-wrapper">
                <div className="payment-program-details">
                    <div
                        className="payment-program-card"
                        style={{ backgroundImage: `url(${program.image})` }}
                    >
                        <div className="payment-program-info">
                            <h2 className="payment-program-name">{program.name}</h2>
                            <p className="payment-program-price">${program.price}</p>
                        </div>
                    </div>
                </div>

                <div className="payment-form-container">
                    <h2 className="payment-form-title">Payment Details</h2>

                    <form className="payment-form-element" onSubmit={handleSubmit(submitPayment)} method="POST">
                        <div className="payment-card-icons">
                            <img
                                src="/images/visa.png"
                                alt="Visa"
                                className={`payment-card-icon ${cardType === 'visa' ? 'payment-icon-active' : ''}`}
                            />
                            <img
                                src="/images/mastercard.png"
                                alt="MasterCard"
                                className={`payment-card-icon ${cardType === 'mastercard' ? 'payment-icon-active' : ''}`}
                            />
                            <img
                                src="/images/american-express.png"
                                alt="American Express"
                                className={`payment-card-icon ${cardType === 'amex' ? 'payment-icon-active' : ''}`}
                            />
                        </div>

                        {error && (
                            <div className="payment-error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        {isPaymentSuccessful ? (
                            <div className="payment-success-message">
                                <i className="fas fa-check-circle"></i>
                                <h3>Payment Successful!</h3>
                                <p>Redirecting to programs...</p>
                            </div>
                        ) : (
                            <>
                                <div className="payment-form-fields">
                                    <div className="payment-form-group">
                                        <label htmlFor="nameOnCard">Name on Card</label>
                                        <input
                                            type="text"
                                            id="nameOnCard"
                                            name="nameOnCard"
                                            placeholder="John Doe"
                                            value={values.nameOnCard}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="payment-form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            value={values.cardNumber}
                                            onChange={handleFormattedChange}
                                            maxLength="19"
                                            required
                                        />
                                    </div>

                                    <div className="payment-inline-fields">
                                        <div className="payment-form-group">
                                            <label htmlFor="expirationDate">Expiration Date</label>
                                            <input
                                                type="text"
                                                id="expirationDate"
                                                name="expirationDate"
                                                placeholder="MM/YY"
                                                value={values.expirationDate}
                                                onChange={handleFormattedChange}
                                                maxLength="5"
                                                required
                                            />
                                        </div>

                                        <div className="payment-form-group">
                                            <label htmlFor="cvv">CVV</label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                name="cvv"
                                                placeholder="123"
                                                value={values.cvv}
                                                onChange={handleFormattedChange}
                                                maxLength="4"
                                                required
                                            />
                                        </div>
                                        <div className="payment-form-group">
                                            <label htmlFor="securityCode">Security Code</label>
                                            <input
                                                type="text"
                                                id="securityCode"
                                                name="securityCode"
                                                placeholder="1234"
                                                value={values.securityCode}
                                                onChange={handleFormattedChange}
                                                maxLength="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-summary-box">
                                    <div className="payment-summary-row">
                                        <span>Program price:</span>
                                        <span>${program.price}</span>
                                    </div>
                                    <div className="payment-summary-row">
                                        <span>Tax:</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="payment-summary-row payment-summary-total">
                                        <span>Total:</span>
                                        <span>${program.price}</span>
                                    </div>
                                </div>

                                <button className="payment-submit-btn">Complete Payment</button>

                                <div className="payment-secure-notice">
                                    <i className="fas fa-lock"></i>
                                    <span>Secure payment - Your data is protected</span>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;