import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar.jsx";
import MainContent from "./components/mainContent/MainContent.jsx";
import Footer from "./components/footer/Footer.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import NotFound from "./components/notfound/NotFound.jsx";
import ForumContainer from "./components/forum/ForumContainer.jsx"
import CreatePost from "./components/createPost/CreatePost.jsx";
import PostDetails from "./components/postDetails/PostDetails.jsx";
import EditPost from "./components/editPost/EditPost.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import UserProfile from "./components/userProfile/UserProfile.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux"
import PrivateGuard from "./components/PrivetRoute.jsx";
import PublicGuard from "./components/PublicRoute.jsx";
import CommentForm from "./components/postComment/CommentForm.jsx";
import EditCommentForm from "./components/еditComment/EditComment.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider />
        <NavBar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/forum" element={<ForumContainer />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/forum/:postId/details" element={<PostDetails />} />
          <Route element={<PublicGuard />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateGuard />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/forum/:postId/edit" element={<EditPost />} />
            <Route path="/forum/:postId/comment" element={<CommentForm />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/forum/:postId/comment/:commentId/edit" element={<EditCommentForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
        <AuthProvider />
      </Provider>
    </>
  );
}

export default App;
