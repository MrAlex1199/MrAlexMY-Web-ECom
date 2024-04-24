import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your connection URI in .evn file)
mongoose.connect(process.env.MONGO)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

// User schema with email and hashed password
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

app.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode the token to get the user's ID or email
    const user = await User.findById(decodedToken.id); // Assuming user ID is stored in the token
    res.status(200).json({ success: true, fname: user.fname, lname: user.lname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch user details' });
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const user = new User({ email, password, fname, lname });
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully', isLoggedIn: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed', isLoggedIn: false });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password', isLoggedIn: false });
    }

    const user = { id: existingUser._id, email: existingUser.email, fname: existingUser.fname, lname: existingUser.lname };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('jwt', token, { httpOnly: true, secure: true });
    res.status(200).json({ success: true, message: 'Login successful', token, isLoggedIn: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed', isLoggedIn: false });
  }
});

app.post('/logout', async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});