import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
        <div className="comment-edit-container">
            <div className="comment-edit-wrapper">
                <Link to={`/forum/${paramPostId}/details`} className="back-link-edit-post">
                    <img src="/images/back.png" alt="Back Arrow" className="back-arrow" />
                    <span>Back to Post</span>
                </Link>
                
                <form onSubmit={handleSubmit(handleFormSubmit)} method="POST" className="comment-edit-form">
                    <h2>Edit Comment</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="comment-input"
                            value={values.content}
                            onChange={handleChange}
                            placeholder="Share your thoughts here..."
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Update Comment</button>
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => navigate(`/forum/${paramPostId}/details`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCommentForm;