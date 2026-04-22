import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // FIXED: Hard refresh logout function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='logo'>MyBlog</Link>
      <ul>
        <li><Link to='/home' className={location.pathname === '/home' ? 'active' : ''}>Home</Link></li>
        <li><Link to='/about' className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
        <li><Link to='/contact' className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        
        {!user && (
          <>
            <li><Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
            <li><Link to='/register' className={location.pathname === '/register' ? 'active' : ''}>Register</Link></li>
          </>
        )}
        
        {user && (
          <>
            <li><Link to='/create-post' className={location.pathname === '/create-post' ? 'active' : ''}>Create Post</Link></li>
            <li><Link to='/profile' className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link></li>
            {user.role === 'admin' && (
              <li><Link to='/admin' className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link></li>
            )}
            <li><button onClick={handleLogout} className='nav-logout'>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;