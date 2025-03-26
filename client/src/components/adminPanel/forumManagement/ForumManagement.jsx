import { useEffect, useState } from "react";
import postApi from "../../../api/postApi.js";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../confirmDialog/ConfirmDialog.jsx";
import './forummanagement.css';

export default function ForumManagement() {
    const [posts, setPosts] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postApi.getAll();
                if (response) {
                    setPosts(response);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleCancel = () => {
        setShowDialog(false);
        setPostIdToDelete(null);
    };

    const handleDelete = async () => {
        if (postIdToDelete) {
            try {
                const response = await postApi.delete(postIdToDelete);
                if (response) {
                    setPosts(prevPosts => prevPosts.filter(post => post._id !== postIdToDelete));
                }
                setShowDialog(false);
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    const handleDeleteClick = (postId) => {
        setPostIdToDelete(postId);
        setShowDialog(true);
    };

    return (
        <div className="forum-admin-panel">
            <Link to="/adminpanel" className="back-link">
                <img src="/images/back.png" alt="Back Arrow" className="back-arrow" />
                <span className="back-text">Back to Admin Panel</span>
            </Link>
            <h2>Forum Management</h2>
            <div className="forum-posts-list">
                {posts.length === 0 ? (
                    <h2 className="no-posts">No posts available.</h2>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="forum-post-container">
                            <span className="forum-post-id">ID: {post._id}</span>
                            <span className="forum-post-author">Author: {post.author}</span>
                            <span className="forum-post-title">Title: {post.title}</span>
                            <span className="forum-post-created-at">Created At: {new Date(post.createdAt).toLocaleDateString()}</span>
                            <Link to={`/adminpanel/posts/${post._id}/edit`} className="forum-edit-link">
                                <img src="/images/edit.png" alt="Edit Post" className="forum-edit-icon" />
                            </Link>
                            <Link className="forum-delete-link" onClick={() => handleDeleteClick(post._id)}>
                                <img src="/images/delete.png" alt="Delete Post" className="forum-delete-icon" />
                            </Link>
                        </div>
                    ))
                )}

                {showDialog && (
                    <ConfirmationDialog onCancel={handleCancel} onConfirm={handleDelete} />
                )}
            </div>
        </div>
    );
}