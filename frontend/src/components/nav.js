import { Link, useLocation } from 'react-router-dom';
function Nav() {
const location = useLocation();
const links = [
{ path: '/home', label: 'Home' },
{ path: '/about', label: 'About' },
{ path: '/contact', label: 'Contact' },
{ path: '/register', label: 'Join' },
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
</ul>
</nav>
);
}
export default Nav;