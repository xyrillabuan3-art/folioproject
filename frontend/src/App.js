import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SplashPage from './pages/splashpages';
import HomePage from './pages/homepage';
import AboutPage from './pages/aboutpages';
import ContactPage from './pages/contactpage';
import RegisterPage from './pages/registerpage';
import LoginPage from './pages/loginpage';
import GamePage from './pages/gamepage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/createPostPage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/adminPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<SplashPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/game' element={<GamePage />} />
          <Route path='/posts/:id' element={<PostPage />} />
          <Route path='/create-post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
          <Route path='/edit-post/:id' element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute role='admin'><AdminPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;