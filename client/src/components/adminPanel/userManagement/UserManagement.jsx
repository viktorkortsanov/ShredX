import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../../api/userApi";
import "./usermanagement.css";

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userApi.getAll();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="admin-panel">
            <Link to="/adminpanel" className="back-link">
                <img src="/images/back.png" alt="Back Arrow" className="back-arrow" />
                <span className="back-text">Back to Admin Panel</span>
            </Link>
            <h2>User Management</h2>
            <div className="user-list">
                {users.map(user => (
                    <div key={user._id} className="user-container">
                        <span className="user-id">id: {user._id}</span>
                        <span className="user-email">email: {user.email}</span>
                        <span className="user-username">username: {user.username}</span>
                        <Link to={`/adminpanel/${user._id}/info`} className="delete-link">
                            <img src="/images/info.png" alt="Delete User" className="delete-icon" />
                        </Link>
                    </div>
                ))}с
            </div>
        </div>
    );
}