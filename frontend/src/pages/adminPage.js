import { useState, useEffect } from 'react';
import API from '../api/axios';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <h2>Users ({users.length})</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} - {u.email} - {u.role}</li>
        ))}
      </ul>
      <h2>Posts ({posts.length})</h2>
      <ul>
        {posts.map(p => (
          <li key={p._id}>{p.title} - by {p.author?.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;