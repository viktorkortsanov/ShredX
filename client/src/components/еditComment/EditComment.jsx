import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import postApi from '../../api/postApi.js';
import './editcommentform.css';

const EditCommentForm = () => {
    const { postId: paramPostId, commentId } = useParams();
    const { values, handleChange, handleSubmit, error, setError, setValues } = useForm({
        content: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const data = await postApi.get(paramPostId);
                const comment = data.comments.find(comment => comment._id === commentId);
                if (comment) {
                    setValues({ content: comment.content });
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchComment();
    }, [paramPostId, commentId, setValues, setError]);

    const handleFormSubmit = async (values) => {
        try {
            const response = await postApi.editComment(paramPostId, commentId, values.content);

            if (response) {
                navigate(`/forum/${paramPostId}/details`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="comment-form-container">
            <form onSubmit={handleSubmit(handleFormSubmit)} method="POST" className="comment-form">
                <h2>Edit Comment</h2>
                {error && <p className="error-message">{error}</p>}
                <textarea
                    name="content"
                    className="comment-input"
                    value={values.content}
                    onChange={handleChange}
                    placeholder="Type a comment..."
                />
                <button type="submit" className="submit-btn">Update</button>
            </form>
        </div>
    );
};

export default EditCommentForm;