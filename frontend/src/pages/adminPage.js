import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await API.get('/admin/users');
        const postsRes = await API.get('/admin/posts');
        setUsers(usersRes.data || []);
        setPosts(postsRes.data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading Admin Dashboard...</div>;
  }

  if (!user) {
    return <div style={{ padding: '20px' }}>Please login first</div>;
  }

  if (user.role !== 'admin') {
    return <div style={{ padding: '20px' }}>Access Denied. Your role is: {user.role}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      
      <h2>Users ({users.length})</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} - {u.email} - Role: {u.role}</li>
        ))}
      </ul>

      <h2>Posts ({posts.length})</h2>
      <ul>
        {posts.map(p => (
          <li key={p._id}>{p.title} - by {p.author?.name || 'Unknown'}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;