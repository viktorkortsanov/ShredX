import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './PostDetails.css';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3030/forum/${postId}/details`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Error fetching post');
                }
                const data = await response.json();
                setPost(data.post);
                setIsOwner(data.isOwner);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [postId]);

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

            <div className="post-actions">
                {isAuthenticated && !isOwner && (
                    <div className="like-comment-actions">
                        <Link to={`/forum/${postId}/like`} className="action-btn">
                            <img src="/images/like.png" alt="Like" className="action-img" />
                        </Link>
                        <Link to={`/forum/${postId}/comment`} className="action-btn">
                            <img src="/images/comment.png" alt="Comment" className="action-img" />
                        </Link>
                    </div>
                )}
                {isOwner && (
                    <div className="edit-delete-actions">
                        <Link to={`/forum/${postId}/edit`} className="action-btn edit">Edit</Link>
                        <Link to={`/forum/${postId}/delete`} className="action-btn delete">Delete</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetails;