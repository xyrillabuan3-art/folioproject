import React, { useState, useEffect } from 'react';
import API from '../api/axios';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('members');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch users and posts from the backend
        const [usersRes, postsRes] = await Promise.all([
          API.get('/admin/users'),
          API.get('/admin/posts')
        ]);
        
        setUsers(usersRes.data || []);
        setPosts(postsRes.data || []);
        
        // For messages - you can replace this with your actual messages API
        // For now, we'll use dummy data or fetch from your backend if available
        try {
          const messagesRes = await API.get('/admin/messages');
          setMessages(messagesRes.data || []);
        } catch (err) {
          // If messages endpoint doesn't exist yet, use empty array
          setMessages([]);
        }
        
        setError('');
      } catch (err) {
        console.error('Admin fetch error:', err);
        setError('Failed to load admin data. Please make sure you are logged in as admin.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Helper function to get total counts
  const getTotalMembers = () => users.length;
  const getTotalPosts = () => posts.length;
  const getTotalMessages = () => messages.length;

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading Admin Dashboard...</h2>
        <p>Please wait while we fetch the data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: 'red' }}>Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{ padding: '10px 20px', backgroundColor: '#ff69b4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff69b4', marginBottom: '30px', textAlign: 'center' }}>Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {/* Total Members Card */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '10px', 
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Members</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#ff69b4' }}>{getTotalMembers()}</p>
        </div>
        
        {/* Total Posts Card */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '10px', 
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Posts</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#ff69b4' }}>{getTotalPosts()}</p>
        </div>
        
        {/* Total Messages Card */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '10px', 
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Messages</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#ff69b4' }}>{getTotalMessages()}</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px', 
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '10px'
      }}>
        <button
          onClick={() => setActiveTab('members')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'members' ? '#ff69b4' : '#f8f9fa',
            color: activeTab === 'members' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Members ({getTotalMembers()})
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'posts' ? '#ff69b4' : '#f8f9fa',
            color: activeTab === 'posts' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Posts ({getTotalPosts()})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'messages' ? '#ff69b4' : '#f8f9fa',
            color: activeTab === 'messages' ? 'white' : '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Messages ({getTotalMessages()})
        </button>
      </div>
      
      {/* Members Tab Content */}
      {activeTab === 'members' && (
        <div>
          <h3>Member List</h3>
          {users.length === 0 ? (
            <p>No members found.</p>
          ) : (
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#ff69b4', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <td style={{ padding: '10px' }}>{user.name || 'N/A'}</td>
                    <td style={{ padding: '10px' }}>{user.email || 'N/A'}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: user.role === 'admin' ? '#ff69b4' : '#4caf50',
                        color: 'white'
                      }}>
                        {user.role || 'member'}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: user.status === 'active' ? '#4caf50' : '#f44336',
                        color: 'white'
                      }}>
                        {user.status || 'active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      {/* Posts Tab Content */}
      {activeTab === 'posts' && (
        <div>
          <h3>Post List</h3>
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#ff69b4', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Author</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post._id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <td style={{ padding: '10px' }}>{post.title || 'N/A'}</td>
                    <td style={{ padding: '10px' }}>{post.author?.name || 'Unknown'}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: post.status === 'published' ? '#4caf50' : '#f44336',
                        color: 'white'
                      }}>
                        {post.status || 'published'}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      {/* Messages Tab Content */}
      {activeTab === 'messages' && (
        <div>
          <h3>Message List</h3>
          {messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#ff69b4', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>From</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Message</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <tr key={message._id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <td style={{ padding: '10px' }}>{message.from || 'N/A'}</td>
                    <td style={{ padding: '10px' }}>{message.content || 'N/A'}</td>
                    <td style={{ padding: '10px' }}>{message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;