import { useParams, useNavigate } from 'react-router-dom';
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
            <form onSubmit={handleSubmit(handleFormSubmit)} method="POST" className="comment-form">
                <h2>Post Comment</h2>
                {error && <p className="error-message">{error}</p>}
                <textarea
                    name="content"
                    className="comment-input"
                    value={values.content}
                    onChange={handleChange}
                    placeholder="Type a comment..."
                />
                <button type="submit" className="submit-btn">Post</button>
            </form>
        </div>
    );
};

export default CommentForm;
