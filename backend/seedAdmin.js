const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Use your actual MongoDB connection string
const MONGO_URI = 'mongodb+srv://thefoliouser:TheFolio1234@thefolio.dtbfigo.mongodb.net/thefolio?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'member' }
});

const User = mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    const adminEmail = 'admin@thefolio.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin account already exists.');
      console.log('Email: adminn@thefolioy.com');
      console.log('Password: Admin123456');
      process.exit();
    }
    
    const hashedPassword = await bcrypt.hash('Admin1234', 10);
    
    const admin = new User({
      name: 'TheFolio Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('Admin account created successfully!');
    console.log('Email: thefolioadmin@gmail.com');
    console.log('Password: Admin1234');
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();