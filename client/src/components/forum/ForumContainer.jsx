import PostItem from "./postItem/PostItem.jsx";
import './forumcontainer.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext.jsx";
import { Link } from "react-router-dom";

export default function ForumContainer() {
    const { isAuthenticated } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3030/forum');
                if (!response.ok) {
                    throw new Error('Error fetching posts');
                }
                const data = await response.json();
                console.log(data);
                
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="forum-container">
            {isAuthenticated && (
                <Link to="/create" className="add-post-link">
                    +
                </Link>
            )}

            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <PostItem key={index} post={post} />
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}
