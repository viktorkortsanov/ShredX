import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteUserDialog from "../../deleteUserDialog/DeleteUserDialog";
import userApi from "../../../api/userApi";
import "./usermanagement.css";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userApi.getAll();
                console.log(data);
                
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleCancel = () => {
        setShowDialog(false);
    }

    const deleteUser = () => {

    }

    return (
        <div className="admin-panel">
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
                        <Link className="delete-link" onClick={() => setShowDialog(true)}>
                            <img src="/images/delete.png" alt="Delete User" className="delete-icon" />
                        </Link>
                    </div>
                ))}

                {showDialog && (
                    <DeleteUserDialog onCancel={handleCancel} onConfirm={deleteUser}/>
                )}
            </div>
        </div>
    );
}