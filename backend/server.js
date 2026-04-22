const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ========== CORS CONFIGURATION - ITO ANG IMPORTANTE ==========
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://folioproject-obt6.vercel.app',
    'https://folioproject-obt6-git-main-xyrillabuan3-arts-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== IMPORT MODELS ==========
// Kailangan i-require ang models bago gamitin
try {
  require('./models/User');
  require('./models/Post');
  console.log('Models loaded successfully');
} catch (err) {
  console.log('Models not found, using direct schema definitions');
}

// ========== DEFINE MODELS KUNG WALA PA ==========
// User model (fallback kung walang separate file)
let User;
let Post;

try {
  User = mongoose.model('User');
} catch (err) {
  const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'member' },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now }
  });
  User = mongoose.model('User', userSchema);
}

try {
  Post = mongoose.model('Post');
} catch (err) {
  const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    content: String,
    image: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'published' },
    createdAt: { type: Date, default: Date.now }
  });
  Post = mongoose.model('Post', postSchema);
}

// ========== MONGODB CONNECTION ==========
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ========== AUTH ROUTES (LOGIN) ==========
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role  // <-- IMPORTANTE: ITO ANG ROLE
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== ADMIN ROUTES ==========
// Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts
app.get('/api/admin/posts', async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle user status
app.put('/api/admin/users/:id/status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.status = 'removed';
    await post.save();
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user (for token validation)
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Register route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name || email.split('@')[0],
      email,
      password: hashedPassword,
      role: role || 'member'
    });
    
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Posts route (public)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' }).populate('author', 'name');
    res.json(posts);
  } catch (error) {
    res.json([]);
  }
});

// Single post route
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post route
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, body } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    const post = new Post({
      title,
      body: body || content,
      content: content || body,
      author: decoded.id
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
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