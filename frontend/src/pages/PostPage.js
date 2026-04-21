// frontend/src/pages/PostPage.js
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
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const canEdit = user && (user._id === post.author._id || user.role === 'admin');

  return (
    <div className='post-page'>
      <h1>{post.title}</h1>
      {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt='Cover' />}
      <p>By {post.author.name}</p>
      <div dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br>') }} />
      {canEdit && <Link to={`/edit-post/${post._id}`}>Edit Post</Link>}
    </div>
  );
};

export default PostPage;