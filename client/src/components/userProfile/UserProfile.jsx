import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PostItem from '../forum/postItem/PostItem.jsx';
import ProgramCard from '../programs/program/ProgramCard.jsx';
import programsData from '../programs/programsData.js';
import postApi from '../../api/postApi.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase.js';

import './userprofile.css';
import userApi from '../../api/userApi.js';
 
const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        gender: ''
    });
 
    const fileInputRef = useRef(null);
    const username = useSelector(state => state.auth.user?.username);
    const email = useSelector(state => state.auth.user?.email);
    const userId = useSelector(state => state.auth.user?._id);
    const [userProfileImg,setUserProfileImg] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userPosts = await postApi.getUserPosts(userId);
                const likedPosts = await postApi.getLikedPosts(userId);   
                const response = await userApi.getProfileImage(userId);
                setUserProfileImg(response.profileImage);           
                setUserPosts(userPosts);
                setLikedPosts(likedPosts);
                setProfileData(prevData => ({
                    ...prevData,
                    username: username || '',
                    email: email || ''
                }));
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
    }, [userId, username, email]);
 
    const handleAvatarClick = () => {
 
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
            console.error("File input reference is not available");
        }
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
            const imageRef = ref(storage, `profileImages/${userId}/${selectedFile.name}`);
            await uploadBytes(imageRef, selectedFile);
            const downloadURL = await getDownloadURL(imageRef);
    
            const response = await fetch(`http://localhost:3030/users/${userId}/updateProfileImage`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profileImageUrl: downloadURL }),
            });
    
            if (!response.ok) {
                throw new Error('Неуспешно обновяване на снимката');
            }
    
            const result = await response.json();
            console.log('Profile image updated:', result);
        } catch (error) {
            console.error('Error updating profile image:', error);
        } finally {
            setIsUploading(false);
        }
    };
    
 
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
 
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
          console.log('Saving profile data:', profileData);
        alert('Profile information updated successfully!');
    };
 
    const renderTabContent = () => {
        switch(activeTab) {
            case 'profile':
                return (
                    <div className="profile-form-container">
                        <h3>Edit Profile Information</h3>
                        <form onSubmit={handleProfileSubmit} className="profile-form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    value={profileData.username}
                                    onChange={handleProfileChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea 
                                    id="address" 
                                    name="address" 
                                    value={profileData.address}
                                    onChange={handleProfileChange}
                                    placeholder="Enter your address"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select 
                                    id="gender" 
                                    name="gender" 
                                    value={profileData.gender}
                                    onChange={handleProfileChange}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                            <button type="submit" className="save-profile-btn">Save Changes</button>
                        </form>
                    </div>
                );
            case 'posts':
                return (
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
                );
            case 'liked':
                return (
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
                );
            case 'programs':
                return (
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
                );
            default:
                return null;
        }
    };
 
    return (
        <div className="user-profile-dashboard">
            <div className="profile-sidebar">
                <div className="profile-image-wrapper">
                    <div className="profile-image-container">
                        <img 
                            src={imagePreview || userProfileImg || "/images/null-profile.png"} 
                            alt="User Avatar" 
                            className="user-avatar-large" 
                        />
                        <div 
                            className="image-overlay"
                            onClick={handleAvatarClick}
                        >
                            <span>Click to change photo</span>
                        </div>
 
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleFileChange}
                            accept="image/*"
                            id="profile-image-input"
                        />
                    </div>
 
                    <div className="image-buttons">
                        {/* <button 
                            type="button"
                            className="choose-image-button" 
                            onClick={handleAvatarClick}
                        >
                            Choose Image
                        </button>
                         */}
                        {selectedFile && (
                            <button 
                                className="save-image-button" 
                                onClick={handleSaveImage}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Saving...' : 'Save'}
                            </button>
                        )}
                    </div>
                </div>
 
                <div className="user-info">
                    <h2>{username}</h2>
                    <p className="user-email">{email}</p>
                </div>
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">{userPosts.length}</span>
                        <span className="stat-label">Posts</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{likedPosts.length}</span>
                        <span className="stat-label">Likes</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{purchasedPrograms.length}</span>
                        <span className="stat-label">Programs</span>
                    </div>
                </div>
            </div>
 
            <div className="profile-content">
                <div className="profile-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile Info
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        Your Posts
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
                        onClick={() => setActiveTab('liked')}
                    >
                        Liked Posts
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('programs')}
                    >
                        Bought Programs
                    </button>
                </div>
 
                <div className="tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};
 
export default UserProfile;