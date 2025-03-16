import { useState } from "react";

export default function useForm(initialState) {
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState("");

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
            await callback(values);
        } catch (err) {
            setError(err.message);
        }
    };

    return { values, setValues, handleChange, handleSubmit, error, setError };
}