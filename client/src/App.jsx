import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar.jsx";
import MainContent from "./components/mainContent/MainContent.jsx";
import Footer from "./components/footer/Footer.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import NotFound from "./components/notfound/NotFound.jsx";
import ForumContainer from "./components/forum/ForumContainer.jsx"
import CreatePost from "./components/createPost/CreatePost.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forum" element={<ForumContainer />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
