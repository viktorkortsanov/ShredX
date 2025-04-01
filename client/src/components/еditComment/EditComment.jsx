import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import postApi from '../../api/postApi.js';
import './editcommentform.css';
import { useTranslation } from 'react-i18next';

const EditCommentForm = () => {
    const { postId: paramPostId, commentId } = useParams();
    const { values, handleChange, handleSubmit, error, setError, setValues } = useForm({
        content: '',
    });
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        <div className="comment-edit-container">
            <div className="comment-edit-wrapper">
                <form onSubmit={handleSubmit(handleFormSubmit)} method="POST" className="comment-edit-form">
                    <h2>{t('forum.editComment')}</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="comment-input"
                            value={values.content}
                            onChange={handleChange}
                            placeholder={t('forum.editCommentPlaceholder')}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">{t('forum.editCommentButton')}</button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate(`/forum/${paramPostId}/details`)}
                        >
                            {t('confirmDialog.cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCommentForm;