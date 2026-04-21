import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const links = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className='navbar'>
      <Link to='/' className='logo'>MyBlog</Link>
      <ul>
        {links.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
        {!user && (
          <>
            <li>
              <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register' className={location.pathname === '/register' ? 'active' : ''}>
                Register
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link to='/create-post' className={location.pathname === '/create-post' ? 'active' : ''}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to='/profile' className={location.pathname === '/profile' ? 'active' : ''}>
                Profile
              </Link>
            </li>
            <li>
              <button type='button' className='nav-logout' onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
