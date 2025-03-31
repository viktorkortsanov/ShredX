import { useParams, useNavigate, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm.js';
import postApi from '../../api/postApi.js';
import './commentForm.css';

const CommentForm = () => {
    const { postId: paramPostId } = useParams();
    const { values, handleChange, handleSubmit, error, setError } = useForm({
        content: '',
    });
    
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
                <Link to={`/forum/${paramPostId}/details`} className="back-link-post-comment">
                    <img src="/images/back.png" alt="Back Arrow" className="back-arrow" />
                    <span>Back to Post</span>
                </Link>
                
                <form onSubmit={handleSubmit(handleFormSubmit)} method="POST" className="comment-form">
                    <h2>Post Comment</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <textarea
                            name="content"
                            className="comment-input"
                            value={values.content}
                            onChange={handleChange}
                            placeholder="Share your thoughts..."
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Post Comment</button>
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

export default CommentForm;