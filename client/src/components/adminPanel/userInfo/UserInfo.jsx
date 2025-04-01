/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { useParams } from "react-router-dom";
import ProgramCard from "../../programs/program/ProgramCard.jsx";
import postApi from "../../../api/postApi";
import PostItem from "../../forum/postItem/PostItem";
import { Link } from "react-router-dom";
import './userinfo.css';
import { useAuth } from "../../../contexts/authContext";
import { useTranslation } from "react-i18next";

export default function UserInfo() {
    const { t } = useTranslation();
    const { userId } = useParams();
    const [user, setUser] = useState({ id: "", username: "", email: "" });
    const [likedPosts, setLikedPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [purchasedProgramIds, setPurchasedProgramIds] = useState([]);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const { getAllPrograms } = useAuth();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        async function getUserInfo() {
            try {
                const userInfo = await userApi.getOne(userId);
                const userPosts = await postApi.getUserPosts(userId);
                const likedPosts = await postApi.getLikedPosts(userId);
                const purchasedIds = await userApi.getPurchasedPrograms(userId);
                const purchasedIdsData = await purchasedIds.json();
                
                setUser({ 
                    id: userInfo._id, 
                    username: userInfo.username, 
                    email: userInfo.email, 
                    profileImage: userInfo.profileImage
                });
                
                setLikedPosts(likedPosts);
                setUserPosts(userPosts);
                setPurchasedProgramIds(purchasedIdsData);

                // Зареждане на програмите от API вместо от мокнати данни
                if (purchasedIdsData.length > 0) {
                    const allPrograms = await getAllPrograms();
                    const userPrograms = allPrograms.filter(program => 
                        purchasedIdsData.includes(program.id.toString())
                    );
                    setPurchasedPrograms(userPrograms);
                } else {
                    setPurchasedPrograms([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
    }, [userId, getAllPrograms]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'posts':
                return (
                    <div className="tab-section">
                        <h3>{t('admin.userInfo.userPosts')}</h3>
                        <div className="posts-list">
                            {userPosts.length === 0 ? (
                                <p className='no-items'>{t('admin.userInfo.noPosts')}</p>
                            ) : (
                                userPosts.map((post) => <PostItem key={post._id} post={post} />)
                            )}
                        </div>
                    </div>
                );
            case 'liked':
                return (
                    <div className="tab-section">
                        <h3>{t('admin.userInfo.userLikedPosts')}</h3>
                        <div className="posts-list">
                            {likedPosts.length === 0 ? (
                                <p className='no-items'>{t('admin.userInfo.noLikedPosts')}</p>
                            ) : (
                                likedPosts.map((post) => <PostItem key={post._id} post={post} />)
                            )}
                        </div>
                    </div>
                );
            case 'programs':
                return (
                    <div className="tab-section">
                        <h3>{t('admin.userInfo.userBoughtPrograms')}</h3>
                        <div className="programs-list">
                            {purchasedPrograms.length === 0 ? (
                                <p className='no-items'>{t('admin.userInfo.noPrograms')}</p>
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
        <div className="admin-user-dashboard">
            <Link to="/adminpanel/usersmanagement" className="back-link-userinfo">
                <img src="/images/back.png" alt={t('common.backArrow')} className="back-arrow" />
                <span className="back-text">{t('admin.userInfo.backToUsers')}</span>
            </Link>

            <div className="user-profile-container">
                <div className="profile-sidebar">
                    <div className="profile-image-wrapper">
                        <div className="profile-image-container">
                            <img src={user.profileImage || "/images/null-profile.png"} alt={t('admin.userInfo.userAvatar')} className="user-avatar-large" />
                        </div>
                    </div>

                    <div className="user-info">
                        <h2>{user.username}</h2>

                        <div className="user-details">
                            <div className="user-detail-item">
                                <span className="detail-label">{t('common.email')}</span>
                                <span className="detail-value">{user.email}</span>
                            </div>

                            <div className="user-detail-item">
                                <span className="detail-label">{t('common.username')}</span>
                                <span className="detail-value">{user.username}</span>
                            </div>

                            <div className="user-detail-item">
                                <span className="detail-label">{t('profile.id')}</span>
                                <span className="detail-value user-id">{user.id}</span>
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
                            {t('admin.userInfo.tabs.posts')}
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
                            onClick={() => setActiveTab('liked')}
                        >
                            {t('admin.userInfo.tabs.likedPosts')}
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'programs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('programs')}
                        >
                            {t('admin.userInfo.tabs.boughtPrograms')}
                        </button>
                    </div>

                    <div className="tab-content">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}