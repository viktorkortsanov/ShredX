import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PostItem from '../forum/postItem/PostItem.jsx';
import ProgramCard from '../programs/program/ProgramCard.jsx';
import postApi from '../../api/postApi.js';
import userApi from '../../api/userApi.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase.js';
import './userprofile.css';
import { useAuth } from '../../contexts/authContext.jsx';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setProfileImg } from '../../store/authSlice.js';
 
const UserProfile = () => {
    const { t } = useTranslation();
    const [userPosts, setUserPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        gender: ''
    });
    const [userProfileImg, setUserProfileImg] = useState(null);
    const { getAllPrograms } = useAuth();
    const dispatch = useDispatch();
 
    const fileInputRef = useRef(null);
    const username = useSelector(state => state.auth.user?.username);
    const email = useSelector(state => state.auth.user?.email);
    const userId = useSelector(state => state.auth.user?._id);
    console.log(userId);
    
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, []);
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
                
                try {
                    const storedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
                    
                    if (storedPrograms.length > 0) {
                        const allPrograms = await getAllPrograms();

                        const purchasedProgramsData = allPrograms.filter(program =>
                            storedPrograms.includes(program.id.toString())
                        );
                        
                        setPurchasedPrograms(purchasedProgramsData);
                    } else {
                        setPurchasedPrograms([]);
                    }
                } catch (error) {
                    console.error('Error fetching purchased programs:', error);
                    setPurchasedPrograms([]);
                }
            } catch (err) {
                console.error(err);
            }
        }
 
        if (userId) {
            fetchUserData();
        }
    }, [userId, username, email, getAllPrograms]);
 
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
            console.log(userId);
            
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
                throw new Error('Failed to update profile image');
            }
    
            const result = await response.json();
            console.log('Profile image updated:', result);

            setUserProfileImg(downloadURL);
            dispatch(setProfileImg({profileImg: downloadURL}));
            setSelectedFile(null);
            alert(t('profile.alerts.imageUpdated'));
        } catch (error) {
            console.error('Error updating profile image:', error);
            alert(t('profile.alerts.imageError'));
        } finally {
            setIsUploading(false);
        }
    };
 
    const renderTabContent = () => {
        switch(activeTab) {
            case 'posts':
                return (
                    <div className="posts-section">
                        <h3>{t('profile.tabs.yourPosts')}</h3>
                        <div className="posts-list">
                            {userPosts.length === 0 ? (
                                <p className='no-items'>{t('profile.noPosts')}</p>
                            ) : (
                                userPosts.map((post) => <PostItem key={post._id} post={post} />)
                            )}
                        </div>
                    </div>
                );
            case 'liked':
                return (
                    <div className="posts-section">
                        <h3>{t('profile.tabs.likedPosts')}</h3>
                        <div className="posts-list">
                            {likedPosts.length === 0 ? (
                                <p className='no-items'>{t('profile.noLikedPosts')}</p>
                            ) : (
                                likedPosts.map((post) => <PostItem key={post._id} post={post} />)
                            )}
                        </div>
                    </div>
                );
            case 'programs':
                return (
                    <div className="posts-section">
                        <h3>{t('profile.tabs.boughtPrograms')}</h3>
                        <div className="programs-list">
                            {purchasedPrograms.length === 0 ? (
                                <p className='no-items'>{t('profile.noPrograms')}</p>
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
                            alt={t('profile.avatar')} 
                            className="user-avatar-large" 
                        />
                        <div 
                            className="image-overlay"
                            onClick={handleAvatarClick}
                        >
                            <span>{t('profile.clickToChangePhoto')}</span>
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
                        {selectedFile && (
                            <button 
                                className="save-image-button" 
                                onClick={handleSaveImage}
                                disabled={isUploading}
                            >
                                {isUploading ? t('common.saving') : t('common.save')}
                            </button>
                        )}
                    </div>
                </div>
 
                <div className="user-info">
                    <h2>{username}</h2>
                    
                    <div className="user-details">
                        <div className="user-detail-item">
                            <span className="detail-label">{t('common.email')}</span>
                            <span className="detail-value">{email}</span>
                        </div>
                        
                        <div className="user-detail-item">
                            <span className="detail-label">{t('common.username')}</span>
                            <span className="detail-value">{username}</span>
                        </div>
                        
                        <div className="user-detail-item">
                            <span className="detail-label">{t('profile.id')}</span>
                            <span className="detail-value user-id">{userId}</span>
                        </div>
                    </div>
                </div>
                
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">{userPosts.length}</span>
                        <span className="stat-label">{t('profile.stats.posts')}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{likedPosts.length}</span>
                        <span className="stat-label">{t('profile.stats.likes')}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{purchasedPrograms.length}</span>
                        <span className="stat-label">{t('profile.stats.programs')}</span>
                    </div>
                </div>
            </div>
 
            <div className="profile-content">
                <div className="profile-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        {t('profile.tabs.yourPosts')}
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
                        onClick={() => setActiveTab('liked')}
                    >
                        {t('profile.tabs.likedPosts')}
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('programs')}
                    >
                        {t('profile.tabs.boughtPrograms')}
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