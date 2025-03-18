import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './postdetails.css';
import postApi from '../../api/postApi.js';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.userId);
    const navigate = useNavigate();

    // Функция за зареждане на поста
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postApi.getDetails(postId);


                setPost(data.post);
                setLikesCount(data.post.likes.length);
                setIsLiked(data.post.likes.includes(userId));
                console.log(isLiked);

                setIsOwner(data.isOwner);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId, userId]);

    const handleLikeToggle = async () => {
        try {
            await postApi.likeToggle(postId);
            if (isLiked) {
                setLikesCount(prevCount => prevCount - 1);
            } else {
                setLikesCount(prevCount => prevCount + 1);
            }
            setIsLiked(prevIsLiked => !prevIsLiked);

        } catch (error) {
            console.error('Error toggling like on post:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-details">
            <div className="post-header">
                <div className="user-info">
                    <img src="/images/user-logo.png" alt="User Logo" className="user-logo" />
                    <span className="username">{post.author}</span>
                </div>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="details-container">
                <div className="detail-item">Title: {post.title}</div>
                <div className="detail-item">Content: {post.content}</div>
            </div>

            <div className="likes-count">
                <span>Likes: {likesCount}</span>
            </div>

            <div className="post-actions">
                {isAuthenticated && !isOwner && (
                    <>
                        <button onClick={handleLikeToggle} className="action-btn">
                            {isLiked ? 'Unlike' : 'Like'}
                        </button>
                        <Link to={`/forum/${postId}/comment`} className="action-btn">
                            Comment
                        </Link>
                    </>
                )}

                {isOwner && ( // Проверка дали потребителят е автор на поста
                    <div className="edit-delete-actions">
                        <Link to={`/forum/${postId}/edit`} className="action-btn edit">Edit</Link>
                        <button className="action-btn delete" onClick={() => navigate(`/forum/${postId}/delete`)}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
