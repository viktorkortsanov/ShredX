import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import './PostDetails.css';

const PostDetails = () => {
    const { postId } = useParams();    
    const [post, setPost] = useState(null);
    const { isAuthenticated, userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3030/forum/${postId}/details`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    
                    setPost(data);
                } else {
                    console.error('Failed to fetch post');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post) {
        return null; // Можеш да добавиш loading състояние тук, ако искаш
    }

    const isOwner = post.authorId === userId;

    return (
        <div className="post-details">
            <div className="post-header">
                <div className="user-logo">
                    <img src="/images/user-logo.png" alt="user-logo" />
                </div>
                <span className="username">{post.author}</span>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div className="post-actions">
                    {/* Ако потребителят е автентикиран и не е собственик на поста, показваме Like и Comment */}
                    {isAuthenticated && !isOwner && (
                        <div className="like-comment-actions">
                            <Link to={`/like/${postId}`} className="like">
                                <img src="/images/like.png" alt="like" />
                            </Link>
                            <Link to={`/comment/${postId}`} className="comment">
                                <img src="/images/comment.png" alt="comment" />
                            </Link>
                        </div>
                    )}
                    {/* Ако потребителят е собственик на поста, показваме Edit и Delete */}
                    {isOwner && (
                        <div className="edit-delete-actions">
                            <Link to={`/edit/${postId}`} className="edit">
                                Edit
                            </Link>
                            <Link to={`/delete/${postId}`} className="delete">
                                Delete
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
