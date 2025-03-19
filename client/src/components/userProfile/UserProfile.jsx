import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostItem from '../forum/postItem/PostItem.jsx';
import postApi from '../../api/postApi.js';
import './userprofile.css';

const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const username = useSelector(state => state.auth.user?.username);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userPosts = await postApi.getUserPosts();
                const likedPosts = await postApi.getLikedPosts();
                console.log(likedPosts);

                setUserPosts(userPosts);
                setLikedPosts(likedPosts);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div className="user-profile">
            <div className="profile-header">
                <img src="../../../public/images/personalization.png" alt="User Avatar" className="user-avatar" />
                <h2>Welcome, {username}!</h2>
            </div>

            <div className="posts-section">
                <h3>Your Posts</h3>
                <div className="posts-list">
                    {userPosts.length === 0 ? (
                        <p>No posts yet.</p>
                    ) : (
                        userPosts.map((post, index) => <PostItem key={index} post={post} />)
                    )}
                </div>
            </div>

            <div className="posts-section">
                <h3>Liked Posts</h3>
                <div className="posts-list">
                    {likedPosts.length === 0 ? (
                        <p>You haven't liked any posts yet.</p>
                    ) : (
                        likedPosts.map((post, index) => <PostItem key={index} post={post} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;