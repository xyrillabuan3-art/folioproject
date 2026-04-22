import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?.id) return;
      try {
        const res = await API.get(`/posts/user/${user.id}`);
        setUserPosts(res.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setUserPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [user?.id]);

  // Update name when user changes
  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.bio) setBio(user.bio);
  }, [user]);

  const handleProfile = async (e) => {
    e.preventDefault(); 
    setMsg('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
    } catch (err) { 
      setMsg(err.response?.data?.message || 'Error'); 
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault(); 
    setMsg('');
    try {
      await API.put('/auth/change-password', { 
        currentPassword: curPw,
        newPassword: newPw 
      });
      setMsg('Password changed successfully!');
      setCurPw(''); 
      setNewPw('');
    } catch (err) { 
      setMsg(err.response?.data?.message || 'Error'); 
    }
  };

  // Use the backend URL for profile pictures
  const picSrc = user?.profilePic
    ? `https://folioproject-backend.onrender.com/uploads/${user.profilePic}`
    : '/default-avatar.png';

  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Please Login</h2>
        <p>You need to be logged in to view your profile.</p>
        <a href="/login" style={{ color: '#ff69b4' }}>Go to Login</a>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '30px' }}>My Profile</h2>
      
      {msg && <p style={{ color: 'green', textAlign: 'center', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '5px' }}>{msg}</p>}

      {/* Profile Info Card */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '15px',
        marginBottom: '30px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <img 
          src={picSrc} 
          alt='Profile' 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px' }} 
        />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p style={{ color: '#ff69b4', fontWeight: 'bold' }}>Role: {user.role === 'admin' ? 'Administrator' : 'Member'}</p>
        <p>Total Posts: {userPosts.length}</p>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleProfile} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>Edit Profile</h3>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder='Display name' 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <textarea 
          value={bio} 
          onChange={e => setBio(e.target.value)}
          placeholder='Short bio...' 
          rows={3}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <label>Change Profile Picture:</label>
        <input 
          type='file' 
          accept='image/*' 
          onChange={e => setPic(e.target.files[0])}
          style={{ marginBottom: '10px' }}
        />
        <button type='submit' style={{ backgroundColor: '#ff69b4', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Save Profile
        </button>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handlePassword} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>Change Password</h3>
        <input 
          type='password' 
          placeholder='Current password'
          value={curPw} 
          onChange={e => setCurPw(e.target.value)} 
          required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <input 
          type='password' 
          placeholder='New password (min 6 chars)'
          value={newPw} 
          onChange={e => setNewPw(e.target.value)} 
          required
          minLength={6}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button type='submit' style={{ backgroundColor: '#ff69b4', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Change Password
        </button>
      </form>

      {/* User's Posts Section */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>My Posts ({userPosts.length})</h3>
        {loading ? (
          <p>Loading posts...</p>
        ) : userPosts.length === 0 ? (
          <p>You haven't created any posts yet. <a href="/create-post" style={{ color: '#ff69b4' }}>Create your first post →</a></p>
        ) : (
          userPosts.map(post => (
            <div key={post._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <h4>{post.title}</h4>
              <p>{post.body?.substring(0, 100)}...</p>
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;