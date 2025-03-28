import { Link } from 'react-router-dom';
import './PostItem.css';
import { useEffect, useState } from 'react';

const PostItem = ({ post }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3030/users/${post.owner}`);
                if (!response.ok) { 
                    throw new Error('Грешка при зареждане на данните за потребителя');
                }
                const data = await response.json(); 
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };

        getUser();

    }, [post.owner]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-item">
            <div className="post-header">
                <div className="user-logo">
                    <img src={user.profileImage || '/images/null-profile.png'} alt="user-logo" />
                </div>
                <span className="username">{post.author}</span>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
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
