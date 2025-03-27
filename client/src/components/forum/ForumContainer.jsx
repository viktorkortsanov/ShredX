import PostItem from "./postItem/PostItem.jsx";
import './forumcontainer.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ForumContainer() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3030/forum');
        if (!response.ok) {
          throw new Error('Error fetching posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="forum-container">
      {isAuthenticated && (
        <Link to="/create" className="add-post-link">
          +
        </Link>
      )}

      {loading ? (
        <p className="loading">Loading posts...</p>
      ) : (
        <>
          <div className="posts-wrapper">
            {currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <PostItem key={post._id || index} post={post} />
              ))
            ) : (
              <p className="no-posts">No posts available.</p>
            )}
          </div>

          {posts.length > postsPerPage && (
            <div className="pagination">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="pagination-arrow prev-arrow"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
                  <polyline id="secondary" points="15.5 5 8.5 12 15.5 19" style={{fill: 'none', stroke: 'rgb(44, 169, 188)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2}}></polyline>
                  <polyline id="primary" points="10 19 3 12 10 5" style={{fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2}}></polyline>
                  <polyline id="primary-2" points="21 5 14 12 21 19" style={{fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2}}></polyline>
                </svg>
              </button>
              
              <div className="page-numbers">
                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                className="pagination-arrow next-arrow"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" id="triple-right-sign" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
                  <path id="secondary" d="M8.5,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L14.09,12,7.79,5.71A1,1,0,1,1,9.21,4.29l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,8.5,20Z" style={{fill: 'rgb(44, 169, 188)'}}></path>
                  <path id="primary" d="M14,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L19.59,12l-6.3-6.29a1,1,0,0,1,1.42-1.42l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,14,20ZM3.71,19.71l7-7a1,1,0,0,0,0-1.42l-7-7A1,1,0,0,0,2.29,5.71L8.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0Z" style={{fill: 'rgb(0, 0, 0)'}}></path>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}