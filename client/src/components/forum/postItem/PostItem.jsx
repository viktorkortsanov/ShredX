import { Link } from 'react-router-dom';
import './PostItem.css';
import {useEffect, useState } from 'react';


const PostItem = ({ post }) => {
  
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3030/users/${post.owner}`);
                console.log('Getting user', response);
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
                <div className="user-avatar">
                <img src={user.profileImage || '/images/null-profile.png'} alt="user-logo" />
                </div>
                <div className="post-info">
                    <h3 className="username">{post.author}</h3>
                    <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">
                    {post.content && post.content.substring(0, 120)}
                    {post.content && post.content.length > 120 ? '...' : ''}
                </p>
                <Link to={`/forum/${post._id}/details`} className="read-post-link">
                    Reade more... 
                </Link>
            </div>
        </div>
    );
};

export default PostItem;