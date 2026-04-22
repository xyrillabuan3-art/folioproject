const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// ========== ADMIN ROUTES ==========
// Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await mongoose.model('User').find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts
app.get('/api/admin/posts', async (req, res) => {
  try {
    const posts = await mongoose.model('Post').find({}).populate('author', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle user status
app.put('/api/admin/users/:id/status', async (req, res) => {
  try {
    const user = await mongoose.model('User').findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove post
app.put('/api/admin/posts/:id/remove', async (req, res) => {
  try {
    const post = await mongoose.model('Post').findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.status = 'removed';
    await post.save();
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Posts route
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await mongoose.model('Post').find({ status: 'published' }).populate('author', 'name');
    res.json(posts);
  } catch (error) {
    res.json([]);
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('TheFolio API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});