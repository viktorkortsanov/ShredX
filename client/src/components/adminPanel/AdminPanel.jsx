import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './adminpanel.css';
import userApi from "../../api/userApi.js";
import postApi from "../../api/postApi.js";

export default function AdminPanel() {
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
                <h1>Admin Dashboard</h1>
                <p className="admin-subtitle">Manage your platform with powerful tools</p>
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
                        <p>Total Users</p>
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
                        <p>Forum Posts</p>
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
                        <p>Program Sales</p>
                    </div>
                </div>
            </div>

            <div className="admin-modules">
                <Link to="/adminpanel/usersmanagement" className="admin-module-card">
                    <div className="module-icon">
                        <img src="/images/user-settings.png" alt="User Management" />
                    </div>
                    <div className="module-content">
                        <h2>User Management</h2>
                        <p>Manage users, permissions, and account details</p>
                        <ul className="module-features">
                            <li>User accounts</li>
                            <li>Profile verification</li>
                            <li>User privileges</li>
                        </ul>
                        <div className="module-action">
                            <span>Manage Users</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </Link>

                <Link to="/adminpanel/forummanagement" className="admin-module-card">
                    <div className="module-icon">
                        <img src="/images/settings.png" alt="Forum Management" />
                    </div>
                    <div className="module-content">
                        <h2>Forum Management</h2>
                        <p>Moderate discussions, posts and community content</p>
                        <ul className="module-features">
                            <li>Post moderation</li>
                            <li>Comment management</li>
                            <li>Content filtering</li>
                        </ul>
                        <div className="module-action">
                            <span>Manage Forum</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </Link>

                <Link to="/adminpanel/analytics" className="admin-module-card">
                    <div className="module-icon">
                        <img src="/images/analiz.svg"/>
                    </div>
                    <div className="module-content">
                        <h2>Analytics</h2>
                        <p>View platform statistics and performance metrics</p>
                        <ul className="module-features">
                            <li>User activity trends</li>
                            <li>Program sales metrics</li>
                            <li>Platform performance</li>
                        </ul>
                        <div className="module-action">
                            <span>View Analytics</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}