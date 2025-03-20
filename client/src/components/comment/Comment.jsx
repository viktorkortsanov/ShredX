import React from "react";
import { Link } from "react-router-dom";
import "./comment.css";

const Comment = ({ comment, userId, isAuthenticated, postId, onDelete }) => {
    const isOwner = userId === comment.owner;
   
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
                            Like
                        </button>
                    )
                )}
            </div>
        </div>
    );
};
export default Comment;