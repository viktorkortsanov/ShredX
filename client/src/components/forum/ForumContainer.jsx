import PostItem from "./postItem/PostItem.jsx";
import './forumcontainer.css';
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext.jsx";
import { Link } from "react-router-dom";

export default function ForumContainer() {
    const { isAuthenticated } = useContext(AuthContext)

    const posts = [
        { username: 'JohnDoe', title: 'My First Post', content: 'This is the content of my first post!' },
        { username: 'JaneDoe', title: 'Another Post', content: 'Here is some more content.' },
    ];

    return (
        <div className="forum-container">
            {/* Бутон за добавяне на пост, вижда се само за auth user-и */}
            {isAuthenticated && (
                <Link to="/create" className="add-post-link">
                    +
                </Link>
            )}

            {/* Мапване на постовете */}
            {posts.map((post, index) => (
                <PostItem key={index} post={post} />
            ))}
        </div>
    );
}
