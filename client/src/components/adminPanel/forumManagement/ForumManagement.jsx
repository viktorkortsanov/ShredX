import { useEffect, useState } from "react";
import postApi from "../../../api/postApi.js";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../confirmDialog/ConfirmDialog.jsx";
import './forummanagement.css';
import userApi from "../../../api/userApi.js";
import { useTranslation } from 'react-i18next';

export default function ForumManagement() {
    const { t } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [userImages,setUserImages] = useState({});

    const postsPerPage = 3;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await postApi.getAll();
                console.log(response);
                
                if (response) {
                    setPosts(response);
                }

                const usersImages = {};
                for (const post of response) {
                    const userResponse = await userApi.getProfileImage(post.owner);
                    usersImages[post.owner] = userResponse.profileImage;
                }

                setUserImages(usersImages);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
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

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
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
        <div className="forum-management-container">
            <div className="dashboard-header">
                <Link to="/adminpanel" className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor" />
                    </svg>
                    <span>{t('admin.backToDashboard')}</span>
                </Link>
                <h1 className="dashboard-title">{t('admin.forumManagement.title')}</h1>
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon posts-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M16.8 19L14 22.5 11.2 19H6a1 1 0 0 1-1-1V7.103a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-5.2zM2 2h17v2H3v11H1V3a1 1 0 0 1 1-1z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{posts.length}</h3>
                            <p>{t('admin.forumManagement.totalPosts')}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon authors-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{new Set(posts.map(post => post.author)).size}</h3>
                            <p>{t('admin.forumManagement.uniqueAuthors')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="forum-controls">
                <div className="search-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="search-icon">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor" />
                    </svg>
                    <input
                        type="text"
                        placeholder={t('admin.forumManagement.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>{t('admin.forumManagement.loadingPosts')}</p>
                </div>
            ) : (
                <>
                    <div className="posts-table-container">
                        <div className="posts-table-header">
                            <div className="table-cell post-title-header">{t('admin.forumManagement.table.title')}</div>
                            <div className="table-cell post-author-header">{t('admin.forumManagement.table.author')}</div>
                            <div className="table-cell post-date-header">{t('admin.forumManagement.table.date')}</div>
                            <div className="table-cell post-actions-header">{t('admin.forumManagement.table.actions')}</div>
                        </div>

                        {currentPosts.length > 0 ? (
                            <div className="posts-table-body">
                                {currentPosts.map(post => (
                                    <div key={post._id} className="post-row">
                                        <div className="table-cell post-title-cell">
                                            <div className="post-title">{post.title}</div>
                                            <div className="post-id">ID: {post._id}</div>
                                        </div>

                                        <div className="table-cell post-author-cell">
                                            <div className="post-author">
                                            <div className="author-avatar">
                                            {userImages[post.owner] ? (
                                                <img src={userImages[post.owner]} className="author-avatar-img" alt={t('admin.forumManagement.authorAvatar')} />
                                            ) : (
                                                <span>{post.author.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                                <span>{post.author}</span>
                                            </div>
                                        </div>

                                        <div className="table-cell post-date-cell">
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <div className="table-cell post-actions-cell">
                                            <Link to={`/forum/${post._id}/edit`} className="post-action-button edit-button">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" fill="currentColor" />
                                                </svg>
                                                <span>{t('admin.forumManagement.actions.edit')}</span>
                                            </Link>
                                            <button onClick={() => handleDeleteClick(post._id)} className="post-action-button delete-button">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="currentColor" />
                                                </svg>
                                                <span>{t('admin.forumManagement.actions.delete')}</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-posts-message">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" fill="currentColor" />
                                </svg>
                                <p>{t('admin.forumManagement.noPostsFound')}</p>
                            </div>
                        )}
                    </div>

                    {filteredPosts.length > postsPerPage && (
                        <div className="pagination">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="pagination-arrow prev-arrow"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
                                    <polyline id="secondary" points="15.5 5 8.5 12 15.5 19" style={{ fill: 'none', stroke: 'rgb(44, 169, 188)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
                                    <polyline id="primary" points="10 19 3 12 10 5" style={{ fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
                                    <polyline id="primary-2" points="21 5 14 12 21 19" style={{ fill: 'none', stroke: 'rgb(0, 0, 0)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
                                </svg>
                            </button>

                            <div className="page-numbers">
                                {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, index) => (
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
                                disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                                className="pagination-arrow next-arrow"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" id="triple-right-sign" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
                                    <path id="secondary" d="M8.5,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L14.09,12,7.79,5.71A1,1,0,1,1,9.21,4.29l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,8.5,20Z" style={{ fill: 'rgb(44, 169, 188)' }}></path>
                                    <path id="primary" d="M14,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L19.59,12l-6.3-6.29a1,1,0,0,1,1.42-1.42l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,14,20ZM3.71,19.71l7-7a1,1,0,0,0,0-1.42l-7-7A1,1,0,0,0,2.29,5.71L8.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0Z" style={{ fill: 'rgb(0, 0, 0)' }}></path>
                                </svg>
                            </button>
                        </div>
                    )}
                </>
            )}

            {showDialog && (
                <ConfirmationDialog onCancel={handleCancel} onConfirm={handleDelete} />
            )}
        </div>
    );
}