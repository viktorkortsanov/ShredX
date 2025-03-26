import { useEffect, useState} from "react";
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

    useEffect(() => {
        async function getUserInfo() {
            try {
                const userInfo = await userApi.getOne(userId);
                const userPosts = await postApi.getUserPosts(userId);
                const likedPosts = await postApi.getLikedPosts(userId);
                const purchasedIds = await userApi.getPurchasedPrograms(userId);
                const purchasedIdsData = await purchasedIds.json();
                setUser({ id: userInfo._id, username: userInfo.username, email: userInfo.email });
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

    return (
        <div className="user-profile">
            <Link to="/adminpanel/usersmanagement" className="back-link">
                <img src="/images/back.png" alt="Back Arrow" className="back-arrow" />
                <span className="back-text">Back to Users Management</span>
            </Link>
            <div className="profile-header">
                <img src="../../../public/images/personalization.png" alt="User Avatar" className="user-avatar" />
            </div>

            <div className="user-info-container">
                <p className="user-id">id: {user.id}</p>
                <p className="user-email">email: {user.email}</p>
                <p className="user-username">username: {user.username}</p>
            </div>

            <div className="posts-section">
                <h3>User Posts</h3>
                <div className="posts-list">
                    {userPosts.length === 0 ? (
                        <p className='no-items'>No posts yet.</p>
                    ) : (
                        userPosts.map((post) => <PostItem key={post._id} post={post} />)
                    )}
                </div>
            </div>

            <div className="posts-section">
                <h3>User Liked Posts</h3>
                <div className="posts-list">
                    {likedPosts.length === 0 ? (
                        <p className='no-items'>This user haven't liked any posts yet.</p>
                    ) : (
                        likedPosts.map((post) => <PostItem key={post._id} post={post} />)
                    )}
                </div>
            </div>

            <div className="posts-section">
                <h3>User Bought Programs</h3>
                <div className="programs-list">
                    {purchasedPrograms.length === 0 ? (
                        <p className='no-items'>This user haven't bought any programs yet.</p>
                    ) : (
                        purchasedPrograms.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}