import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './adminpanel.css';
import userApi from "../../api/userApi.js";
import postApi from "../../api/postApi.js";
import { useTranslation } from 'react-i18next';

export default function AdminPanel() {
    const { t } = useTranslation();
    const [usersCount, setUsersCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [programSales, setProgramSales] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const users = await userApi.getAll();
                const posts = await postApi.getAll();

                setUsersCount(users.length);
                setPostsCount(posts.length);

                const storedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
                setProgramSales(storedPrograms.length);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>{t('admin.dashboard')}</h1>
                <p className="admin-subtitle">{t('admin.subtitle')}</p>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <div className="stat-icon users-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        {loading ? (
                            <h3 className="loading-indicator">...</h3>
                        ) : (
                            <h3>{usersCount}</h3>
                        )}
                        <p>{t('admin.stats.totalUsers')}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon posts-icon">
                        <i className="fas fa-comments"></i>
                    </div>
                    <div className="stat-info">
                        {loading ? (
                            <h3 className="loading-indicator">...</h3>
                        ) : (
                            <h3>{postsCount}</h3>
                        )}
                        <p>{t('admin.stats.forumPosts')}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon sales-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className="stat-info">
                        {loading ? (
                            <h3 className="loading-indicator">...</h3>
                        ) : (
                            <h3>{programSales}</h3>
                        )}
                        <p>{t('admin.stats.programSales')}</p>
                    </div>
                </div>
            </div>

            <div className="admin-modules">
                <Link to="/adminpanel/usersmanagement" className="admin-module-card">
                    <div className="module-icon">
                        <img src="/images/user-settings.png" alt={t('admin.modules.userManagement.alt')} />
                    </div>
                    <div className="module-content">
                        <h2>{t('admin.modules.userManagement.title')}</h2>
                        <p>{t('admin.modules.userManagement.description')}</p>
                        <ul className="module-features">
                            <li>{t('admin.modules.userManagement.features.accounts')}</li>
                            <li>{t('admin.modules.userManagement.features.verification')}</li>
                            <li>{t('admin.modules.userManagement.features.privileges')}</li>
                        </ul>
                        <div className="module-action">
                            <span>{t('admin.modules.userManagement.action')}</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </Link>

                <Link to="/adminpanel/forummanagement" className="admin-module-card">
                    <div className="module-icon">
                        <img src="/images/settings.png" alt={t('admin.modules.forumManagement.alt')} />
                    </div>
                    <div className="module-content">
                        <h2>{t('admin.modules.forumManagement.title')}</h2>
                        <p>{t('admin.modules.forumManagement.description')}</p>
                        <ul className="module-features">
                            <li>{t('admin.modules.forumManagement.features.moderation')}</li>
                            <li>{t('admin.modules.forumManagement.features.comments')}</li>
                            <li>{t('admin.modules.forumManagement.features.filtering')}</li>
                        </ul>
                        <div className="module-action">
                            <span>{t('admin.modules.forumManagement.action')}</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </Link>

                <Link to="/adminpanel/analytics" className="admin-module-card">
                    <div className="module-icon">
                        <img src="/images/analytics.png" alt={t('admin.modules.analytics.alt')} />
                    </div>
                    <div className="module-content">
                        <h2>{t('admin.modules.analytics.title')}</h2>
                        <p>{t('admin.modules.analytics.description')}</p>
                        <ul className="module-features">
                            <li>{t('admin.modules.analytics.features.userTrends')}</li>
                            <li>{t('admin.modules.analytics.features.salesMetrics')}</li>
                            <li>{t('admin.modules.analytics.features.performance')}</li>
                        </ul>
                        <div className="module-action">
                            <span>{t('admin.modules.analytics.action')}</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="admin-additional-modules">
                <Link to="/adminpanel/createprograms" className="admin-module-card create-program-card">
                    <div className="module-icon">
                        <img src="/images/add-content.png" alt={t('admin.modules.createPrograms.alt')} />
                    </div>
                    <div className="module-content">
                        <h2>{t('admin.modules.createPrograms.title')}</h2>
                        <p>{t('admin.modules.createPrograms.description')}</p>
                        <ul className="module-features">
                            <li>{t('admin.modules.createPrograms.features.creator')}</li>
                            <li>{t('admin.modules.createPrograms.features.templates')}</li>
                            <li>{t('admin.modules.createPrograms.features.pricing')}</li>
                        </ul>
                        <div className="module-action">
                            <span>{t('admin.modules.createPrograms.action')}</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}