import React from "react";
import { Link } from "react-router-dom";
import "./comment.css";

const Comment = ({ comment, userId, isAuthenticated, postId, onDelete, onLike }) => {
    const isOwner = userId === comment.owner;
    const isLiked = comment.likes.includes(userId); // Проверка дали е харесан

    return (
        <div className="comment-card">
            <div className="comment-header">
                <div className="user-info">
                    <img src="/images/user-logo.png" alt="User Logo" className="user-logo" />
                    <span className="username">{comment.author}</span>
                </div>
                <span className="comment-date">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "N/A"}
                </span>
            </div>

            <div className="comment-content">
                {comment.content}
            </div>

            <div className="comment-actions">
                {isOwner ? (
                    <>
                        <Link to={`/forum/${postId}/comment/${comment._id}/edit`} className="action-btn edit">
                            Edit
                        </Link>
                        <button className="action-btn delete" onClick={() => onDelete(comment._id)}>
                            Delete
                        </button>
                    </>
                ) : (
                    isAuthenticated && (
                        <button className="action-btn like" onClick={() => onLike(comment._id)}>
                            {isLiked ? "Unlike" : "Like"}
                        </button>
                    )
                )}
            </div>

            {/* Like count в долния десен ъгъл */}
            <div className="comment-likes">
                <img 
                    src="/images/like.png" 
                    alt="Like" 
                    className="like-img"
                />
                <span className="like-count">{comment.likes.length}</span>
            </div>
        </div>
    );
};

export default Comment;