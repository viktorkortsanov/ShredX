import { useState } from "react";

export default function useForm(initialState) {
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "cardNumber") {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 16) return;
        }
    
        setValues((prev) => ({ ...prev, [name]: value }));
    
        if (name === "cardNumber") {
            if (value.length !== 16) {
                setError("Card number must be 16 digits long");
            } else {
                setError("");
            }
        }

        if (name === "expirationDate") {
            if (!/^\d{2}\/\d{2}$/.test(value)) {
                setError("Expiration date must be in MM/YY format.");
                return;
            }
        
            const [month, year] = value.split("/").map(Number);
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
        
            if (month < 1 || month > 12) {
                setError("Month must be between 01 and 12.");
                return;
            }
        
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                setError("Expiration date must be in the future.");
                return;
            }
        
            setError("");
        }

        if (name === "cvv" || name === "securityCode") {
            if (!/^\d{3}$/.test(value)) {
                setError(`${name === "cvv" ? "CVV" : "Security Code"} must be exactly 3 digits.`);
                return;
            }
            setError("");
        }
        
    };
    

    const handleSubmit = (callback) => async (e) => {
        e.preventDefault();

        const hasEmptyFields = Object.values(values).some(value => !value.trim());

        if (hasEmptyFields) {
            setError("All fields are required.");
            return;
        }

        try {
            await callback(values);
        } catch (err) {
            setError(err.message);
        }
    };

    return { values, setValues, handleChange, handleSubmit, error, setError };
}