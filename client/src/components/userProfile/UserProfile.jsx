import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostItem from '../forum/postItem/PostItem.jsx';
import postApi from '../../api/postApi.js';
import './userprofile.css';

const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const username = useSelector(state => state.auth.user?.username);

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                const posts = await postApi.getUserPosts();
                console.log(posts);
                setUserPosts(posts);
            } catch (err) {
                console.error(err);
            }
        }
    
        fetchUserPosts();
    }, []);

    return (
        <div className="user-profile">
            <div className="profile-header">
                <img src="../../../public/images/personalization.png" alt="User Avatar" className="user-avatar" />
                <h2>Welcome, {username} !</h2>
            </div>

            <div className="posts-section">
                <h3>Posts in forum</h3>
                <div className="posts-list">
                    {userPosts.length === 0 ? (
                        <p>Няма публикации в форума.</p>
                    ) : (
                        userPosts.map((post, index) => (
                            <PostItem key={index} post={post} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default UserProfile;