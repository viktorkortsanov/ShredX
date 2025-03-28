import React, { useState } from 'react';
import useForm from '../../../hooks/useForm.js';
import programs from '../programsData.js';
import './PaymentForm.css';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentForm = () => {
    const { programId } = useParams();
    const program = programs.find(prog => prog.id.toString() === programId.toString());
    const navigate = useNavigate();

    const { values, handleChange, handleSubmit, error, setError } = useForm({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        nameOnCard: '',
        securityCode: '',
    });

    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const submitPayment = async () => {
        try {
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
                navigate('/programs');
            } else {
                setError('Payment failed');
            }
        } catch (err) {
            console.error(err);
            setError('Error purchasing program');
        }
    };

    return (
        <div className="payment-container">
            <div className="program-details">
                <div
                    className="program-card"
                    style={{ backgroundImage: `url(${program.image})` }}
                >
                    <div className="program-info">
                        <h2 className="program-name">{program.name}</h2>
                        <p className="program-price">${program.price}</p>
                    </div>
                </div>
            </div>

            <form className="payment-form" onSubmit={handleSubmit(submitPayment)} method="POST">
                <div className="card-icons">
                    <img src="/images/visa.png" alt="Visa" className="card-icon" />
                    <img src="/images/mastercard.png" alt="MasterCard" className="card-icon" />
                    <img src="/images/american-express.png" alt="American Express" className="card-icon" />
                </div>

                {error && <p className="error-message">{error}</p>}

                {isPaymentSuccessful ? (
                    <div className="payment-success-message">
                        <h3>Payment Successful!</h3>
                    </div>
                ) : (
                    <>
                        <div className="form-fields">
                            <input
                                type="text"
                                name="nameOnCard"
                                placeholder="Name on Card"
                                value={values.nameOnCard}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={values.cardNumber}
                                onChange={handleChange}
                            />
                            <div className="inline-fields">
                                <input
                                    type="text"
                                    name="expirationDate"
                                    placeholder="MM/YY"
                                    value={values.expirationDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={values.cvv}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="securityCode"
                                    placeholder="Security Code"
                                    value={values.securityCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button className="submit-btn-pay">Submit Payment</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;