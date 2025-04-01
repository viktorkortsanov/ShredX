import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./comment.css";
import userApi from "../../api/userApi";
import { useTranslation } from "react-i18next";

const Comment = ({ comment, userId, isAuthenticated, postId, onDelete, onLike }) => {
    const isOwner = userId === comment.owner;
    const isLiked = comment.likes.includes(userId);
    const [userProfileImg, setUserProfileImg] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        async function getUserProfileImg() {
            try {
                const response = await userApi.getProfileImage(comment.owner);
                setUserProfileImg(response.profileImage);
            } catch (error) {
                console.log(error);
            }
        }

        getUserProfileImg();
    })

    return (
        <div className="comment-card">
            <div className="comment-header">
                <div className="user-info">
                    <img src={userProfileImg || "/images/null-profile.png"} alt="User Logo" className="user-logo" />
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
                            {t('common.edit')}
                        </Link>
                        <button className="action-btn delete" onClick={() => onDelete(comment._id)}>
                            {t('forum.deletePost')}
                        </button>
                    </>
                ) : (
                    isAuthenticated && (
                        <button className="action-btn like" onClick={() => onLike(comment._id)}>
                            {isLiked ? t('forum.unlike') : t('forum.like')}
                        </button>
                    )
                )}
            </div>

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