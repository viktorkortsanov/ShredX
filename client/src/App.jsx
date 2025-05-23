import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar.jsx";
import MainContent from "./components/mainContent/MainContent.jsx";
import Footer from "./components/footer/Footer.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import NotFound from "./components/notfound/NotFound.jsx";
import ForumContainer from "./components/forum/ForumContainer.jsx";
import CreatePost from "./components/createPost/CreatePost.jsx";
import PostDetails from "./components/postDetails/PostDetails.jsx";
import EditPost from "./components/editPost/EditPost.jsx";
import UserProfile from "./components/userProfile/UserProfile.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import PrivateGuard from "./components/routes/PrivateRoute.jsx";
import PublicGuard from "./components/routes/PublicRoute.jsx";
import CommentForm from "./components/postComment/CommentForm.jsx";
import EditCommentForm from "./components/еditComment/EditComment.jsx";
import ProgramsContainer from "./components/programs/programsContainer.jsx";
import PaymentForm from "./components/programs/paymentForm/PaymentForm.jsx";
import ProgramDetails from "./components/programs/programdDetails/ProgramDetails.jsx";
import OurTeam from "./components/ourTeam/OurTeam.jsx";
import AdminPanel from "./components/adminPanel/AdminPanel.jsx";
import UserManagement from "./components/adminPanel/userManagement/UserManagement.jsx";
import ForumManagement from "./components/adminPanel/forumManagement/ForumManagement.jsx";
import AdminGuard from "./components/routes/AdminRoute.jsx";
import UserInfo from "./components/adminPanel/userInfo/UserInfo.jsx";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy.jsx";
import TermsOfService from "./components/termsOfService/TermsOfService.jsx";
import Contact from "./components/contacts/Contacts.jsx";
import Analytics from "./components/adminPanel/аnalytics/Analytics.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import CreateProgram from "./components/adminPanel/createProgram/CreateProgram.jsx";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.jsx";
import FAQ from "./components/faq/Faq.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n.js";
import OurStory from "./components/ourStory/ourStory.jsx";
import CookieConsentFooter from "./components/cookieConsent/CookieConsent.jsx";

function App() {
  return (
    <>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <NavBar />
              <ErrorBoundary fallback={<NotFound />}>
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/forum" element={<ForumContainer />} />
                <Route path="/404/*" element={<NotFound />} />
                <Route path="/forum/:postId/details" element={<PostDetails />} />
                <Route path="/ourteam" element={<OurTeam />} />
                <Route path="/ourstory" element={<OurStory />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />

                <Route element={<PublicGuard />}>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<PrivateGuard />}>
                  <Route path="/create" element={<CreatePost />} />
                  <Route path="/forum/:postId/edit" element={<EditPost />} />
                  <Route path="/forum/:postId/comment" element={<CommentForm />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/programs" element={<ProgramsContainer />} />
                  <Route path="/forum/:postId/comment/:commentId/edit" element={<EditCommentForm />} />
                  <Route path="/programs/pay/:programId" element={<PaymentForm />} />
                  <Route path="/programs/:programId/details" element={<ProgramDetails />} />
                </Route>

                <Route element={<AdminGuard />}>
                  <Route path="/adminpanel" element={<AdminPanel />} />
                  <Route path="/adminpanel/usersmanagement" element={<UserManagement />} />
                  <Route path="/adminpanel/analytics" element={<Analytics />} />
                  <Route path="/adminpanel/forummanagement" element={<ForumManagement />} />
                  <Route path="/adminpanel/createprograms" element={<CreateProgram />} />

                  <Route path="/adminpanel/posts/:postId/edit" element={<EditPost />} />
                  <Route path="/adminpanel/:userId/info" element={<UserInfo />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
              </ErrorBoundary>
              <CookieConsentFooter />
              <Footer />
          </AuthProvider>
        </Provider>
      </I18nextProvider>
    </>
  );
}

export default App;