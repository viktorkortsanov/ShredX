import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../confirmDialog/ConfirmDialog.jsx';
import './postdetails.css';
import postApi from '../../api/postApi.js';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.user?._id);    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postApi.getDetails(postId);
                setPost(data.post);
                setLikesCount(data.post.likes.length);

                const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
                setIsLiked(likedPosts[postId] || data.post.likes.includes(userId));

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
            const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
            likedPosts[postId] = !isLiked;
            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

        } catch (error) {
            console.error('Error toggling like on post:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await postApi.delete(postId);
            if (response) {
                navigate('/forum');
            }
        } catch (error) {
            console.error('Error deleting post:', error)
        } finally {
            setShowDialog(false);
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
    }

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

                {isOwner && (
                    <div className="edit-delete-actions">
                        <Link to={`/forum/${postId}/edit`} className="action-btn edit">Edit</Link>
                        <button className="action-btn delete" onClick={() => setShowDialog(true)}>Delete</button>
                    </div>
                )}

                {showDialog && (
                    <ConfirmationDialog onCancel={handleCancel} onConfirm={handleDelete} />
                )}
            </div>
        </div>
    );
};

export default PostDetails;