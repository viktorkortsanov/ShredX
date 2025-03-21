import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../confirmDialog/ConfirmDialog.jsx";
import Comment from '../comment/Comment.jsx'
import "./postdetails.css";
import postApi from "../../api/postApi.js";

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [likesCount, setLikesCount] = useState(0);;
    const [isLiked, setIsLiked] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [comments, setComments] = useState([]);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.user?._id);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postApi.getDetails(postId);
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
                <div className="like-img-container">
                    <img src="/images/like.png" alt="Like" className="like-img" />
                    <span className="like-count">{likesCount}</span>
                </div>
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
    
            <div className="comments-section">
                <h3>Comments</h3>
    
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                postId={postId}
                                userId={userId}
                                isAuthenticated={isAuthenticated}
                                onDelete={() => handleDeleteComment(comment._id)}
                                onLike={() => handleLikeComment(comment._id)}
                            />
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );    
};
export default PostDetails;