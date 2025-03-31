import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../confirmDialog/ConfirmDialog.jsx";
import Comment from '../comment/Comment.jsx';
import "./postdetails.css";
import postApi from "../../api/postApi.js";
import userApi from "../../api/userApi.js";

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [userProfileImg, setUserProfileImg] = useState(null);
    const [comments, setComments] = useState([]);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.user?._id);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postApi.getDetails(postId);
                const userProfileImg = await userApi.getProfileImage(data.post.owner);
                setUserProfileImg(userProfileImg.profileImage);
                setPost(data.post);
                setLikesCount(data.post.likes.length);
                setComments(data.post.comments);
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
            setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
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
            console.error('Error deleting post:', error);
        } finally {
            setShowDialog(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await postApi.deleteComment(postId, commentId);

            if (response) {
                setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            await postApi.likeComment(postId, commentId);

            setComments(prevComments =>
                prevComments.map(comment =>
                    comment._id === commentId
                        ? {
                            ...comment,
                            likes: comment.likes.includes(userId)
                                ? comment.likes.filter(id => id !== userId)
                                : [...comment.likes, userId]
                        }
                        : comment
                )
            );

            const likedComments = JSON.parse(localStorage.getItem('likedComments')) || {};
            likedComments[commentId] = !likedComments[commentId];
            localStorage.setItem('likedComments', JSON.stringify(likedComments));

        } catch (error) {
            console.error('Error toggling like on comment:', error);
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    if (!post) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="post-details-container">
            <Link to="/forum" className="back-link-forum">
                <img src="/images/back.png" alt="Back Arrow" className="back-arrow" />
                <span className="back-text">Back to Forum</span>
            </Link>

            <div className="post-details-card">
                <div className="post-details-header">
                    <div className="user-avatar">
                        <img
                            src={userProfileImg || "/images/null-profile.png"}
                            alt="User Avatar"
                            onError={(e) => { e.target.src = "/images/null-profile.png" }}
                        />
                    </div>
                    <div className="post-info">
                        <h3 className="username">{post.author}</h3>
                        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="post-details-content">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-body">{post.content}</p>

                    <div className="post-stats">
                        <div className="likes-counter">
                            <img src="/images/like.png" alt="Like" className="like-icon" />
                            <span>{likesCount}</span>
                        </div>
                        <div className="comments-counter">
                            <img src="/images/comment.png" alt="Comments" className="comment-icon" />
                            <span>{comments.length}</span>
                        </div>
                    </div>
                </div>

                <div className="post-actions">
                    {isAuthenticated && !isOwner && (
                        <div className="action-buttons">
                            <button
                                onClick={handleLikeToggle}
                                className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
                            >
                                {isLiked ? 'Unlike' : 'Like'}
                            </button>
                            <Link to={`/forum/${postId}/comment`} className="action-btn comment-btn">
                                Comment
                            </Link>
                        </div>
                    )}

                    {isOwner && (
                        <div className="owner-actions">
                            <Link to={`/forum/${postId}/edit`} className="action-btn edit-btn">
                                <i className="fas fa-edit"></i> Edit
                            </Link>
                            <button className="action-btn delete-btn" onClick={() => setShowDialog(true)}>
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {comments.length > 0 && (
                <div className="comments-section">
                    <h3>Comments ({comments.length})</h3>
                    <div className="comments-list">
                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                postId={postId}
                                userId={userId}
                                isAuthenticated={isAuthenticated}
                                onDelete={() => handleDeleteComment(comment._id)}
                                onLike={() => handleLikeComment(comment._id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {showDialog && (
                <ConfirmationDialog onCancel={handleCancel} onConfirm={handleDelete} />
            )}
        </div>
    );
};

export default PostDetails;