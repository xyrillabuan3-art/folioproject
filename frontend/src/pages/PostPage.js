import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (!post) return <div style={{ padding: '20px' }}>Post not found</div>;

  const canEdit = user && (user._id === post.author?._id || user.role === 'admin');
  
  // Use the Render backend URL for images
  const imageUrl = post.image ? `https://thefolio-api.onrender.com/uploads/${post.image}` : null;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      {imageUrl && <img src={imageUrl} alt="Cover" style={{ maxWidth: '100%', borderRadius: '10px' }} />}
      <p><strong>By:</strong> {post.author?.name || 'Unknown'}</p>
      <p><strong>Date:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: (post.body || post.content || '').replace(/\n/g, '<br>') }} />
      {canEdit && (
        <Link to={`/edit-post/${post._id}`} style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#ff69b4', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Edit Post
        </Link>
      )}
      <br />
      <Link to="/home" style={{ display: 'inline-block', marginTop: '20px' }}>← Back to Home</Link>
    </div>
  );
};

export default PostPage;