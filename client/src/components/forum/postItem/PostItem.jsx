import { Link } from 'react-router-dom';
import './PostItem.css';

const PostItem = ({ post }) => {
    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="post-item">
            <div className="post-header">
                <div className="user-logo">
                    <img src="/images/user-logo.png" alt="user-logo" />
                </div>
                <span className="username">{post.author}</span>
                <span className="post-date">{formattedDate}</span>
            </div>
            <div className="post-content">
                <h2>{post.title}</h2>
                <Link to={`/forum/${post._id}/details`} className="read-post-link">
                    Read Post
                </Link>
            </div>
        </div>
    );
};

export default PostItem;
