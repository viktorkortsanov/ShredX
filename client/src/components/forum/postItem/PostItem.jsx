import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext.jsx';
import './PostItem.css';

// Път към иконките за like и comment
import likeIcon from '../../../../public/images/like.png';
import commentIcon from '../../../../public/images/comment.png';

const PostItem = ({ post }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showContent, setShowContent] = useState(false);

    // Функция за показване на съдържанието при натискане на бутон Read Post
    const handleReadPost = () => {
        setShowContent(true);
    };

    return (
        <div className="post-item">
            <div className="post-header">
                {/* Потребителското лого */}
                <div className="user-logo">
                    <img src="../../../../public/images/user-logo.png" alt="user-logo" />
                </div>
                {/* Името на потребителя */}
                <span className="username">{post.username}</span>
            </div>
            <div className="post-content">
                {/* Заглавие на поста */}
                <h2>{post.title}</h2>

                {/* Показване на съдържанието, ако потребителят е автентикиран */}
                {showContent ? (
                    <>
                        <p>{post.content}</p>
                        {isAuthenticated && (
                            <div className="post-actions">
                                <Link to="#" className="like">
                                    <img src={likeIcon} alt="like" />
                                </Link>
                                <Link to="#" className="comment">
                                    <img src={commentIcon} alt="comment" />
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <button className="read-post-btn" onClick={handleReadPost}>Read Post</button>
                )}
            </div>
        </div>
    );
};

export default PostItem;
