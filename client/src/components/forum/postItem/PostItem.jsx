import { Link } from 'react-router-dom';
import './PostItem.css';
import { useEffect, useState } from 'react';

const PostItem = ({ post }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3030/users/${post.owner}`); // предполагам, че използваш API
                if (!response.ok) { // проверка дали отговорът е успешен
                    throw new Error('Грешка при зареждане на данните за потребителя');
                }
                const data = await response.json(); // преобразуване в JSON
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };

        getUser();

    }, [post.owner]);

    if (!user) {
        return <div>Loading...</div>; // може да върнеш съобщение за зареждане, докато не се зареди потребителят
    }

    return (
        <div className="post-item">
            <div className="post-header">
                <div className="user-logo">
                    <img src={user.profileImage} alt="user-logo" />
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
