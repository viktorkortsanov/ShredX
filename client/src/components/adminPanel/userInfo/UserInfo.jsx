import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { useParams } from "react-router-dom";
import ProgramCard from "../../programs/program/ProgramCard.jsx";
import postApi from "../../../api/postApi";
import programsData from "../../programs/programsData";
import PostItem from "../../forum/postItem/PostItem";
import { Link } from "react-router-dom";
import './userinfo.css';

export default function UserInfo() {
    const { userId } = useParams();
    const [user, setUser] = useState({ id: "", username: "", email: "" });
    const [likedPosts, setLikedPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [purchasedProgramIds, setPurchasedProgramIds] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');

    useEffect(() => {
        async function getUserInfo() {
            try {
                const userInfo = await userApi.getOne(userId);
                const userPosts = await postApi.getUserPosts(userId);
                const likedPosts = await postApi.getLikedPosts(userId);
                const purchasedIds = await userApi.getPurchasedPrograms(userId);
                const purchasedIdsData = await purchasedIds.json();
                setUser({ id: userInfo._id, username: userInfo.username, email: userInfo.email, profileImage: userInfo.profileImage});
                
                setLikedPosts(likedPosts);
                setUserPosts(userPosts);
                setPurchasedProgramIds(purchasedIdsData);

            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo();
    }, [userId]);

    const purchasedPrograms = programsData.filter(program =>
        purchasedProgramIds.includes(program.id.toString())
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'posts':
                return (
                    <div className="tab-section">
                        <h3>User Posts</h3>
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
                    <div className="tab-section">
                        <h3>User Liked Posts</h3>
                        <div className="posts-list">
                            {likedPosts.length === 0 ? (
                                <p className='no-items'>This user hasn't liked any posts yet.</p>
                            ) : (
                                likedPosts.map((post) => <PostItem key={post._id} post={post} />)
                            )}
                        </div>
                    </div>
                );
            case 'programs':
                return (
                    <div className="tab-section">
                        <h3>User Bought Programs</h3>
                        <div className="programs-list">
                            {purchasedPrograms.length === 0 ? (
                                <p className='no-items'>This user hasn't bought any programs yet.</p>
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
                <img src="/images/back.png" alt="Back Arrow" className="back-arrow" />
                <span className="back-text">Back to Users Management</span>
            </Link>

            <div className="user-profile-container">
                <div className="profile-sidebar">
                    <div className="profile-image-wrapper">
                        <div className="profile-image-container">
                            <img src={user.profileImage || "/images/null-profile.png"} alt="User Avatar" className="user-avatar-large" />
                        </div>
                    </div>

                    <div className="user-info">
                        <h2>{user.username}</h2>

                        <div className="user-details">
                            <div className="user-detail-item">
                                <span className="detail-label">Email</span>
                                <span className="detail-value">{user.email}</span>
                            </div>

                            <div className="user-detail-item">
                                <span className="detail-label">Username</span>
                                <span className="detail-value">{user.username}</span>
                            </div>

                            <div className="user-detail-item">
                                <span className="detail-label">ID</span>
                                <span className="detail-value user-id">{user.id}</span>
                            </div>
                        </div>
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
                            className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            User Posts
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
        </div>
    );
}