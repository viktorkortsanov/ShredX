import PostItem from "./postItem/PostItem.jsx";
import './forumcontainer.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ForumContainer() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3030/forum');
        if (!response.ok) {
          throw new Error('Error fetching posts');
        }
        const data = await response.json();
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
        <p className="no-posts">No posts available.</p>
      )}
    </div>
  );
}