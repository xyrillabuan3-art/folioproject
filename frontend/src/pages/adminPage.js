import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          API.get('/admin/users'),
          API.get('/admin/posts')
        ]);
        setUsers(usersRes.data || []);
        setPosts(postsRes.data || []);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const { data } = await API.put(`/admin/users/${id}/status`);
      setUsers(users.map(u => u._id === id ? data.user : u));
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const removePost = async (id) => {
    try {
      await API.put(`/admin/posts/${id}/remove`);
      setPosts(posts.map(p => p._id === id ? { ...p, status: 'removed' } : p));
    } catch (error) {
      console.error('Error removing post:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h2>Access Denied</h2>
        <p>Admin privileges required to view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#ff69b4', marginBottom: '20px' }}>Admin Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <button 
          onClick={() => setTab('users')} 
          style={{
            padding: '10px 20px',
            backgroundColor: tab === 'users' ? '#ff69b4' : '#f0f0f0',
            color: tab === 'users' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Members ({users.length})
        </button>
        <button 
          onClick={() => setTab('posts')} 
          style={{
            padding: '10px 20px',
            backgroundColor: tab === 'posts' ? '#ff69b4' : '#f0f0f0',
            color: tab === 'posts' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          All Posts ({posts.length})
        </button>
      </div>

      {tab === 'users' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff69b4', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ padding: '10px' }}>{u.name || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{u.email || 'N/A'}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: u.status === 'active' ? '#4caf50' : '#f44336',
                    color: 'white'
                  }}>
                    {u.status || 'active'}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => toggleStatus(u._id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: u.status === 'active' ? '#ff9800' : '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {u.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'posts' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff69b4', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Author</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, index) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ padding: '10px' }}>{p.title || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{p.author?.name || 'Unknown'}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: p.status === 'published' ? '#4caf50' : '#f44336',
                    color: 'white'
                  }}>
                    {p.status || 'published'}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>
                  {p.status === 'published' && (
                    <button 
                      onClick={() => removePost(p._id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;