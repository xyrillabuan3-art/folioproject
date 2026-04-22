import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content.');
      return;
    }
    
    try {
      // ITO ANG IMPORTANTENG PAGBABAGO: ginamit ang "body" sa halip na "content"
      await API.post('/posts', { 
        title: title.trim(), 
        body: content.trim()  // <-- 'body' ang key na kailangan ng database
      });
      
      setSuccess('Post created successfully! Redirecting to home...');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      console.error('Create post error:', err);
      const errorMsg = err.response?.data?.message || 'Failed to create post. Please try again.';
      setError(errorMsg);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create New Post</h2>
      {error && <p style={{ color: 'red', backgroundColor: '#ffeeee', padding: '10px', borderRadius: '5px' }}>{error}</p>}
      {success && <p style={{ color: 'green', backgroundColor: '#eeffee', padding: '10px', borderRadius: '5px' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label><br/>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label><br/>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="10"
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#ff69b4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;