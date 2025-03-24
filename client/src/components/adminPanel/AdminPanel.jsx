import { Link } from "react-router-dom";
import './adminpanel.css';

export default function AdminPanel() {
    return (
        <div className="admin-panel-container">
            <h2 >Admin Panel</h2>
            <div className="admin-options">
                <div className="admin-option">
                    <h3>User Management</h3>
                    <Link to="/adminpanel/usersmanagement">
                        <img src="/images/user-settings.png" alt="User Management" className="admin-icon" />
                    </Link>
                </div>
                <div className="admin-option">
                    <h3>Forum Management</h3>
                    <Link to="/adminpanel/forummanagement">
                        <img src="/images/settings.png" alt="Forum Management" className="admin-icon" />
                    </Link>
                </div>
            </div>
        </div>
    );
}