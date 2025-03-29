import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../../api/userApi";
import "./usermanagement.css";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 4;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await userApi.getAll();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = selectedRole === 'all' ||
            (selectedRole === 'admin' && user.isAdmin) ||
            (selectedRole === 'user' && !user.isAdmin);

        return matchesSearch && matchesRole;
    });


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
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
        <div className="user-management-container">
            <div className="dashboard-header">
                <Link to="/adminpanel" className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor" />
                    </svg>
                    <span>Back to Dashboard</span>
                </Link>
                <h1 className="dashboard-title">User Management</h1>
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon users-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M2 22a8 8 0 1 1 16 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm7.363 2.233A7.505 7.505 0 0 1 22 22h-6.001a8.46 8.46 0 0 0 1.364-6.767zM16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{users.length}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon admin-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 14v8H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="stat-info">
                            <h3>{users.filter(user => user.isAdmin).length}</h3>
                            <p>Admins</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="user-controls">
                <div className="search-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="search-icon">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="currentColor" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-container">
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="role-filter"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admins</option>
                        <option value="user">Regular Users</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Loading users...</p>
                </div>
            ) : (
                <>
                    <div className="users-table-container">
                        <div className="users-table-header">
                            <div className="table-cell user-avatar-header">Profile</div>
                            <div className="table-cell user-info-header">User Information</div>
                            <div className="table-cell user-status-header">Status</div>
                            <div className="table-cell user-actions-header">Actions</div>
                        </div>

                        {currentUsers.length > 0 ? (
                            <div className="users-table-body">
                                {currentUsers.map(user => (
                                    <div key={user._id} className="user-row">
                                        <div className="table-cell user-avatar-cell">
                                            <div className="user-avatar">
                                                <div className="user-avatar">
                                                    {user.profileImage ? (
                                                        <img src={user.profileImage} alt="User Avatar" className="user-image" />
                                                    ) : (
                                                        <span className="user-initial">{user.username.charAt(0).toUpperCase()}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="table-cell user-info-cell">
                                            <div className="user-name">{user.username}</div>
                                            <div className="user-email">{user.email}</div>
                                            <div className="user-id">ID: {user._id}</div>
                                        </div>

                                        <div className="table-cell user-status-cell">
                                            <span className={`status-badge ${user.isAdmin ? 'admin-badge' : 'user-badge'}`}>
                                                {user.isAdmin ? 'Admin' : 'User'}
                                            </span>
                                        </div>

                                        <div className="table-cell user-actions-cell">
                                            <Link to={`/adminpanel/${user._id}/info`} className="user-action-button info-button">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" fill="currentColor" />
                                                </svg>
                                                <span>Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-users-message">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M18 18v2H6v-2h12zm3-7v5H3v-5h18zm-2-6v3H5V5h14z" fill="currentColor" />
                                </svg>
                                <p>No users found matching your search criteria</p>
                            </div>
                        )}
                    </div>

                    {/* Пагинация */}
                    {filteredUsers.length > usersPerPage && (
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
                                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
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
                                disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
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
        </div>
    );
}