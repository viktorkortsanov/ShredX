import { useParams, useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import postApi from '../../api/postApi.js';
import './commentForm.css';
import { useTranslation } from 'react-i18next';

const CommentForm = () => {
    const { postId: paramPostId } = useParams();
    const { values, handleChange, handleSubmit, error, setError } = useForm({
        content: '',
    });
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        try {
            const response = await postApi.comment(paramPostId, values.content);
            if (response) {
                navigate(`/forum/${paramPostId}/details`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="comment-form-container">
            <div className="comment-form-wrapper">
                <form onSubmit={handleSubmit(handleFormSubmit)} method="POST" className="comment-form">
                    <h2>{t('forum.postComment')}</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="comment-input"
                            value={values.content}
                            onChange={handleChange}
                            placeholder={t('forum.editCommentPlaceholder')}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">{t('forum.postCommentButton')}</button>
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

export default CommentForm;