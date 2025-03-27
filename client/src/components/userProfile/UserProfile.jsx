import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PostItem from '../forum/postItem/PostItem.jsx';
import ProgramCard from '../programs/program/ProgramCard.jsx';
import programsData from '../programs/programsData.js';
import postApi from '../../api/postApi.js';
import userApi from '../../api/userApi.js';
import './userprofile.css';
 
const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
 
    const fileInputRef = useRef(null);
    const username = useSelector(state => state.auth.user?.username);
    const userId = useSelector(state => state.auth.user?._id);
 
    useEffect(() => {
        async function fetchUserData() {
            try {
                const userPosts = await postApi.getUserPosts(userId);
                const likedPosts = await postApi.getLikedPosts(userId);                
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
 
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };
 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
 
    const handleSaveImage = async () => {
        if (!selectedFile) return;
 
        setIsUploading(true);
        try {
            await userApi.uploadProfileImage(userId, selectedFile);
           //смени го на английски ако искаш 
            alert('Профилната снимка е обновена успешно!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Възникна грешка при качването на снимката.');
        } finally {
            setIsUploading(false);
        }
    };
 
    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="avatar-container">
                    <img 
                        src={imagePreview || "../../../public/images/personalization.png"} 
                        alt="User Avatar" 
                        className="user-avatar" 
                        onClick={handleAvatarClick}
                    />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {selectedFile && (
                        <button 
                            className="save-image-btn" 
                            onClick={handleSaveImage}
                            disabled={isUploading}
                        >
                            {isUploading ? 'Запазване...' : 'Запази'}
                        </button>
                    )}
                </div>
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