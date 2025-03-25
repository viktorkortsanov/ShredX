import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostItem from '../forum/postItem/PostItem.jsx';
import ProgramCard from '../programs/program/ProgramCard.jsx';
import programsData from '../programs/programsData.js';
import postApi from '../../api/postApi.js';
import './userprofile.css';

const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
    const username = useSelector(state => state.auth.user?.username);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userPosts = await postApi.getUserPosts();
                const likedPosts = await postApi.getLikedPosts();
                setUserPosts(userPosts);
                setLikedPosts(likedPosts);
            } catch (err) {
                console.error(err);
            }
        }

        const storedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
        const purchasedProgramsData = programsData.filter(program =>
            storedPrograms.includes(program.id.toString())
        );
        setPurchasedPrograms(purchasedProgramsData);
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
                        <p className='no-items'>No posts yet.</p>
                    ) : (
                        userPosts.map((post) => <PostItem key={post._id} post={post} />)
                    )}
                </div>
            </div>

            <div className="posts-section">
                <h3>Liked Posts</h3>
                <div className="posts-list">
                    {likedPosts.length === 0 ? (
                        <p className='no-items'>You haven't liked any posts yet.</p>
                    ) : (
                        likedPosts.map((post) => <PostItem key={post._id} post={post} />)
                    )}
                </div>
            </div>

            <div className="posts-section">
                <h3>Bought Programs</h3>
                <div className="programs-list">
                    {purchasedPrograms.length === 0 ? (
                        <p className='no-items'>You haven't bought any programs yet.</p>
                    ) : (
                        purchasedPrograms.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;