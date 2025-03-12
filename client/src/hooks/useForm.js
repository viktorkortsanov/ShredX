import { useState } from "react";

export default function useForm(initialState) {
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState("");  // За грешки

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (callback) => async (e) => {
        e.preventDefault();

        const hasEmptyFields = Object.values(values).some(value => !value.trim());

        if (hasEmptyFields) {
            setError("All fields are required.");
            return;
        }

        try {
            await callback(values);  // Извикване на колбек с данни
        } catch (err) {
            setError(err.message);  // Обработване на грешки от сървъра
        }
    };

    return { values, handleChange, handleSubmit, error, setError };  // Връщаме setError тук
}
