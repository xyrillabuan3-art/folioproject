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
    return <h2>Loading Admin Dashboard...</h2>;
  }

  if (!user) {
    return <h2>Please login first</h2>;
  }

  if (user.role !== 'admin') {
    return <h2>Access Denied. Admin only. Your role is: {user.role}</h2>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <h2>Users List ({users.length})</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} - {u.email} - Role: {u.role}</li>
        ))}
      </ul>

      <h2>Posts List ({posts.length})</h2>
      <ul>
        {posts.map(p => (
          <li key={p._id}>{p.title} - by {p.author?.name || 'Unknown'}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;